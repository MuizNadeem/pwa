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


export interface ReportSummary {
    deviceId?: number;
    deviceName?: string;
    /**
     * in knots
     */
    maxSpeed?: number;
    /**
     * in knots
     */
    averageSpeed?: number;
    /**
     * in meters
     */
    distance?: number;
    /**
     * in liters
     */
    spentFuel?: number;
    engineHours?: number;
}
