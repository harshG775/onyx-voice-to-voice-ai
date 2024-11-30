import app from "./app";
import { config } from "./constants/config";
import logger from "./utils/winston.logger";

const port = config.server.port || 4000;

const run = async () => {
    try {
        app.listen(port, () => {
            logger.info(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        logger.error("Failed to start server", { error });
        process.exit(1);
    }
};

run();
