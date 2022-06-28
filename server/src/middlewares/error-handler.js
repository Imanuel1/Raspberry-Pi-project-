import {
    BAD_REQUEST,
    INTERNAL_SERVER,
    FORBIDDEN,
    NOT_FOUND,
  } from "../errors/httpsStatusCodes.json";
  import {
    BadRequest,
    ForbiddenError,
    GeneralError,
    InternalServer,
    NotFound
  } from "../errors/errorTypes.error";

  export const reqLogPrefix = (req) => {
    const { ip, path, method } = req;
    const { username } = req.query;
  
    return `${path} - ${method} request from IP '${ip}' username: '${username}'`;
  };
  
  export const errorHandler = (err, req, res, _next) => {
    if (err.code === BAD_REQUEST) {
      const error = new BadRequest(BAD_REQUEST, "Validation Error", false);
  
      console.error(`${reqLogPrefix(req)} - Request failed: Bad Request `, err);
      res.status(error.code).send(error);
    } else if (err.code === FORBIDDEN) {
      const error = new ForbiddenError(
        FORBIDDEN,
        "Request failed due to Forbidden Error (permissions/ token etc.)",
        true
      );
  
      console.error(`${reqLogPrefix(req)} - Request failed: ForbiddenError`, err);
      res.status(error.code).send(error);
    } else if (err.code === NOT_FOUND) {
      const error = new NotFound(
        NOT_FOUND,
        "Query params of the request were not valid",
        true
      );
  
      console.error(
        `${reqLogPrefix(req)} - Request failed: Request Not Found`,
        err
      );
      res.status(error.code).send(error);
    } else if (err.code === INTERNAL_SERVER) {
      const error = new InternalServer(
        INTERNAL_SERVER,
        "Request failed due to an error in the server",
        true
      );
  
      console.error(
        `${reqLogPrefix(req)} - Request failed, internal server Error:  `,
        err
      );
      res.status(INTERNAL_SERVER).send(error);
    } else {
      const error = new GeneralError(err.code, err.message);
  
      console.error(`${reqLogPrefix(req)} - Request failed, General Error: `, err);
      res.status(error.code).send(error);
    }
  };
  