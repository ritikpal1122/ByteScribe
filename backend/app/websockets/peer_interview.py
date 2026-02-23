from __future__ import annotations

from fastapi import WebSocket, WebSocketDisconnect


class ConnectionManager:
    """Manages active WebSocket connections for peer-interview rooms."""

    def __init__(self) -> None:
        # room_id -> list of connected websockets
        self._rooms: dict[str, list[WebSocket]] = {}

    async def connect(self, room_id: str, websocket: WebSocket) -> None:
        """Accept *websocket* and add it to *room_id*."""
        await websocket.accept()
        self._rooms.setdefault(room_id, []).append(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket) -> None:
        """Remove *websocket* from *room_id*."""
        connections = self._rooms.get(room_id, [])
        if websocket in connections:
            connections.remove(websocket)
        if not connections:
            self._rooms.pop(room_id, None)

    async def broadcast(self, room_id: str, message: dict) -> None:
        """Send a JSON *message* to every connection in *room_id*."""
        for ws in self._rooms.get(room_id, []):
            await ws.send_json(message)

    async def send_personal(self, websocket: WebSocket, message: dict) -> None:
        """Send a JSON *message* to a single *websocket*."""
        await websocket.send_json(message)

    def get_room_count(self, room_id: str) -> int:
        """Return the number of active connections in *room_id*."""
        return len(self._rooms.get(room_id, []))


manager = ConnectionManager()


async def peer_interview_endpoint(websocket: WebSocket, room_id: str) -> None:
    """Stub WebSocket endpoint for a peer-interview room.

    Wire this up in your FastAPI app with::

        app.websocket("/ws/interview/{room_id}")(peer_interview_endpoint)
    """
    await manager.connect(room_id, websocket)
    await manager.broadcast(room_id, {
        "type": "system",
        "message": "A participant has joined the room.",
        "participants": manager.get_room_count(room_id),
    })
    try:
        while True:
            data = await websocket.receive_json()
            # Re-broadcast every incoming message to the room
            await manager.broadcast(room_id, {
                "type": "message",
                "data": data,
            })
    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
        await manager.broadcast(room_id, {
            "type": "system",
            "message": "A participant has left the room.",
            "participants": manager.get_room_count(room_id),
        })
