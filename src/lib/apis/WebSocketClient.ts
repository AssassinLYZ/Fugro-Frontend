type MessageHandler = (message: string) => void;

class WebSocketClient {
    private url: string;
    private socket: WebSocket | null = null;
    private messageHandler: MessageHandler | null = null;

    constructor(url: string) {
        this.url = url;
        this.connect();
    }

    private connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
        };

        this.socket.onmessage = (event: MessageEvent) => {
            if (this.messageHandler) {
                this.messageHandler(event.data);
            }
        };

        this.socket.onclose = (event: CloseEvent) => {
            console.log('WebSocket connection closed.', event);
            setTimeout(() => this.connect(), 1000); // Reconnect after 1 second
        };

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
        };
    }

    public sendMessage(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
            console.log(`Sent: ${message}`);
        } else {
            console.log('WebSocket is not open. Unable to send message.');
        }
    }

    public onMessage(handler: MessageHandler) {
        this.messageHandler = handler;
    }

    public close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default WebSocketClient;
