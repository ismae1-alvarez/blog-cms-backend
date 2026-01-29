import winston, { format, transports } from "winston"

const myColors = {
     error: "red",
     warn: "yellow",
     info: "green",
     http: "magenta",
     debug: "blue",
}
// winston.level(levels);
winston.addColors(myColors)

export const logger = winston.createLogger({
     level: "info",
     format: format.combine(
          format.colorize(),
          format.timestamp({
               format: "YYYY-MM-DD HH:mm:ss",
          }),
          format.printf(({ level, message }) => {
               return `${level}: ${message} `
          }),
     ),
     defaultMeta: { service: "listen-server" },
     transports: [new transports.Console()],
})
