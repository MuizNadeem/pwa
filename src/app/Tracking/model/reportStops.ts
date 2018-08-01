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


export interface ReportStops {
    deviceId?: number;
    deviceName?: string;
    duration?: number;
    /**
     * in IS0 8601 format. eg. `1963-11-22T18:30:00Z`
     */
    startTime?: Date;
    address?: string;
    lat?: number;
    lon?: number;
    /**
     * in IS0 8601 format. eg. `1963-11-22T18:30:00Z`
     */
    endTime?: Date;
    /**
     * in liters
     */
    spentFuel?: number;
    engineHours?: number;
}
