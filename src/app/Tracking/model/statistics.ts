/**
 * traccar
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 3.17
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Statistics {
    /**
     * in IS0 8601 format. eg. `1963-11-22T18:30:00Z`
     */
    captureTime?: Date;
    activeUsers?: number;
    activeDevices?: number;
    requests?: number;
    messagesReceived?: number;
    messagesStored?: number;
}
