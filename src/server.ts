import app from "./app";
import { config } from "./app/config/env";

const startServer = () => {
    try {
            app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`)
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();

