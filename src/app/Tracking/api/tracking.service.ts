import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Attribute } from '../model/attribute';
import { Calendar } from '../model/calendar';
import { Command } from '../model/command';
import { CommandType } from '../model/commandType';
import { Device } from '../model/device';
import { DeviceTotalDistance } from '../model/deviceTotalDistance';
import { Driver } from '../model/driver';
import { Event } from '../model/event';
import { Geofence } from '../model/geofence';
import { Group } from '../model/group';
import { Maintenance } from '../model/maintenance';
import { Notification } from '../model/notification';
import { NotificationType } from '../model/notificationType';
import { Permission } from '../model/permission';
import { Position } from '../model/position';
import { ReportStops } from '../model/reportStops';
import { ReportSummary } from '../model/reportSummary';
import { ReportTrips } from '../model/reportTrips';
import { Server } from '../model/server';
import { Statistics } from '../model/statistics';
import { User } from '../model/user';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class TrackingService {

    protected basePath = 'https://tracking.apnetruck.com/api';
    public defaultHeaders = new HttpHeaders();

    public configuration = new Configuration(
        {
            username:"",
            password:""
        }
    );



    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Fetch a list of Attributes
     * Without params, it returns a list of Attributes the user has access to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param deviceId Standard users can use this only with _deviceId_s, they have access to
     * @param groupId Standard users can use this only with _groupId_s, they have access to
     * @param refresh 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public attributesComputedGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<Attribute>>;
    public attributesComputedGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Attribute>>>;
    public attributesComputedGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Attribute>>>;
    public attributesComputedGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (groupId !== undefined) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
        }
        if (refresh !== undefined) {
            queryParameters = queryParameters.set('refresh', <any>refresh);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Attribute>>(`${this.basePath}/attributes/computed`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete an Attribute
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public attributesComputedIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public attributesComputedIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public attributesComputedIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public attributesComputedIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling attributesComputedIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/attributes/computed/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update an Attribute
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public attributesComputedIdPut(id: number, body: Attribute, observe?: 'body', reportProgress?: boolean): Observable<Attribute>;
    public attributesComputedIdPut(id: number, body: Attribute, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Attribute>>;
    public attributesComputedIdPut(id: number, body: Attribute, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Attribute>>;
    public attributesComputedIdPut(id: number, body: Attribute, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling attributesComputedIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling attributesComputedIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Attribute>(`${this.basePath}/attributes/computed/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create an Attribute
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public attributesComputedPost(body: Attribute, observe?: 'body', reportProgress?: boolean): Observable<Attribute>;
    public attributesComputedPost(body: Attribute, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Attribute>>;
    public attributesComputedPost(body: Attribute, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Attribute>>;
    public attributesComputedPost(body: Attribute, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling attributesComputedPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Attribute>(`${this.basePath}/attributes/computed`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Calendars
     * Without params, it returns a list of Calendars the user has access to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public calendarsGet(all?: boolean, userId?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Calendar>>;
    public calendarsGet(all?: boolean, userId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Calendar>>>;
    public calendarsGet(all?: boolean, userId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Calendar>>>;
    public calendarsGet(all?: boolean, userId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Calendar>>(`${this.basePath}/calendars`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Calendar
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public calendarsIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public calendarsIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public calendarsIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public calendarsIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling calendarsIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/calendars/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Calendar
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public calendarsIdPut(id: number, body: Calendar, observe?: 'body', reportProgress?: boolean): Observable<Calendar>;
    public calendarsIdPut(id: number, body: Calendar, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Calendar>>;
    public calendarsIdPut(id: number, body: Calendar, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Calendar>>;
    public calendarsIdPut(id: number, body: Calendar, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling calendarsIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling calendarsIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Calendar>(`${this.basePath}/calendars/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Calendar
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public calendarsPost(body: Calendar, observe?: 'body', reportProgress?: boolean): Observable<Calendar>;
    public calendarsPost(body: Calendar, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Calendar>>;
    public calendarsPost(body: Calendar, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Calendar>>;
    public calendarsPost(body: Calendar, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling calendarsPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Calendar>(`${this.basePath}/calendars`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Saved Commands
     * Without params, it returns a list of Drivers the user has access to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param deviceId Standard users can use this only with _deviceId_s, they have access to
     * @param groupId Standard users can use this only with _groupId_s, they have access to
     * @param refresh 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commandsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<Command>>;
    public commandsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Command>>>;
    public commandsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Command>>>;
    public commandsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (groupId !== undefined) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
        }
        if (refresh !== undefined) {
            queryParameters = queryParameters.set('refresh', <any>refresh);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Command>>(`${this.basePath}/commands`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Saved Command
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commandsIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public commandsIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public commandsIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public commandsIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling commandsIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/commands/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Saved Command
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commandsIdPut(id: number, body: Command, observe?: 'body', reportProgress?: boolean): Observable<Command>;
    public commandsIdPut(id: number, body: Command, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Command>>;
    public commandsIdPut(id: number, body: Command, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Command>>;
    public commandsIdPut(id: number, body: Command, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling commandsIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling commandsIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Command>(`${this.basePath}/commands/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Saved Command
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commandsPost(body: Command, observe?: 'body', reportProgress?: boolean): Observable<Command>;
    public commandsPost(body: Command, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Command>>;
    public commandsPost(body: Command, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Command>>;
    public commandsPost(body: Command, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling commandsPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Command>(`${this.basePath}/commands`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Saved Commands supported by Device at the moment
     * Return a list of saved commands linked to Device and its groups, filtered by current Device protocol support
     * @param deviceId Standard users can use this only with _deviceId_s, they have access to
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commandsSendGet(deviceId?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Command>>;
    public commandsSendGet(deviceId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Command>>>;
    public commandsSendGet(deviceId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Command>>>;
    public commandsSendGet(deviceId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Command>>(`${this.basePath}/commands/send`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Dispatch commands to device
     * Dispatch a new command or Saved Command if _body.id_ set
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commandsSendPost(body: Command, observe?: 'body', reportProgress?: boolean): Observable<Command>;
    public commandsSendPost(body: Command, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Command>>;
    public commandsSendPost(body: Command, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Command>>;
    public commandsSendPost(body: Command, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling commandsSendPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Command>(`${this.basePath}/commands/send`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of available Commands for the Device or all possible Commands if Device ommited
     * 
     * @param deviceId 
     * @param textChannel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commandsTypesGet(deviceId?: number, textChannel?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<CommandType>>;
    public commandsTypesGet(deviceId?: number, textChannel?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CommandType>>>;
    public commandsTypesGet(deviceId?: number, textChannel?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CommandType>>>;
    public commandsTypesGet(deviceId?: number, textChannel?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (textChannel !== undefined) {
            queryParameters = queryParameters.set('textChannel', <any>textChannel);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<CommandType>>(`${this.basePath}/commands/types`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Devices
     * Without any params, returns a list of the user&#39;s devices
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param id To fetch one or more devices. Multiple params can be passed like &#x60;id&#x3D;31&amp;id&#x3D;42&#x60;
     * @param uniqueId To fetch one or more devices. Multiple params can be passed like &#x60;uniqueId&#x3D;333331&amp;uniqieId&#x3D;44442&#x60;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public devicesGet(all?: boolean, userId?: number, id?: number, uniqueId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Device>>;
    public devicesGet(all?: boolean, userId?: number, id?: number, uniqueId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Device>>>;
    public devicesGet(all?: boolean, userId?: number, id?: number, uniqueId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Device>>>;
    public devicesGet(all?: boolean, userId?: number, id?: number, uniqueId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (id !== undefined) {
            queryParameters = queryParameters.set('id', <any>id);
        }
        if (uniqueId !== undefined) {
            queryParameters = queryParameters.set('uniqueId', <any>uniqueId);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Device>>(`${this.basePath}/devices`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Device
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public devicesIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public devicesIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public devicesIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public devicesIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling devicesIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/devices/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update the distance counter of the Device
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public devicesIdDistancePut(id: number, body: DeviceTotalDistance, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public devicesIdDistancePut(id: number, body: DeviceTotalDistance, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public devicesIdDistancePut(id: number, body: DeviceTotalDistance, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public devicesIdDistancePut(id: number, body: DeviceTotalDistance, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling devicesIdDistancePut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling devicesIdDistancePut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/devices/${encodeURIComponent(String(id))}/distance`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Device
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public devicesIdPut(id: number, body: Device, observe?: 'body', reportProgress?: boolean): Observable<Device>;
    public devicesIdPut(id: number, body: Device, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Device>>;
    public devicesIdPut(id: number, body: Device, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Device>>;
    public devicesIdPut(id: number, body: Device, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling devicesIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling devicesIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Device>(`${this.basePath}/devices/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Device
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public devicesPost(body: Device, observe?: 'body', reportProgress?: boolean): Observable<Device>;
    public devicesPost(body: Device, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Device>>;
    public devicesPost(body: Device, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Device>>;
    public devicesPost(body: Device, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling devicesPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Device>(`${this.basePath}/devices`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Drivers
     * Without params, it returns a list of Drivers the user has access to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param deviceId Standard users can use this only with _deviceId_s, they have access to
     * @param groupId Standard users can use this only with _groupId_s, they have access to
     * @param refresh 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public driversGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<Driver>>;
    public driversGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Driver>>>;
    public driversGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Driver>>>;
    public driversGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (groupId !== undefined) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
        }
        if (refresh !== undefined) {
            queryParameters = queryParameters.set('refresh', <any>refresh);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Driver>>(`${this.basePath}/drivers`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Driver
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public driversIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public driversIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public driversIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public driversIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling driversIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/drivers/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Driver
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public driversIdPut(id: number, body: Driver, observe?: 'body', reportProgress?: boolean): Observable<Driver>;
    public driversIdPut(id: number, body: Driver, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Driver>>;
    public driversIdPut(id: number, body: Driver, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Driver>>;
    public driversIdPut(id: number, body: Driver, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling driversIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling driversIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Driver>(`${this.basePath}/drivers/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Driver
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public driversPost(body: Driver, observe?: 'body', reportProgress?: boolean): Observable<Driver>;
    public driversPost(body: Driver, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Driver>>;
    public driversPost(body: Driver, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Driver>>;
    public driversPost(body: Driver, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling driversPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Driver>(`${this.basePath}/drivers`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eventsIdGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<Event>;
    public eventsIdGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Event>>;
    public eventsIdGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Event>>;
    public eventsIdGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling eventsIdGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Event>(`${this.basePath}/events/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Geofences
     * Without params, it returns a list of Geofences the user has access to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param deviceId Standard users can use this only with _deviceId_s, they have access to
     * @param groupId Standard users can use this only with _groupId_s, they have access to
     * @param refresh 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public geofencesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<Geofence>>;
    public geofencesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Geofence>>>;
    public geofencesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Geofence>>>;
    public geofencesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (groupId !== undefined) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
        }
        if (refresh !== undefined) {
            queryParameters = queryParameters.set('refresh', <any>refresh);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Geofence>>(`${this.basePath}/geofences`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Geofence
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public geofencesIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public geofencesIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public geofencesIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public geofencesIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling geofencesIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/geofences/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Geofence
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public geofencesIdPut(id: number, body: Geofence, observe?: 'body', reportProgress?: boolean): Observable<Geofence>;
    public geofencesIdPut(id: number, body: Geofence, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Geofence>>;
    public geofencesIdPut(id: number, body: Geofence, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Geofence>>;
    public geofencesIdPut(id: number, body: Geofence, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling geofencesIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling geofencesIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Geofence>(`${this.basePath}/geofences/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Geofence
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public geofencesPost(body: Geofence, observe?: 'body', reportProgress?: boolean): Observable<Geofence>;
    public geofencesPost(body: Geofence, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Geofence>>;
    public geofencesPost(body: Geofence, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Geofence>>;
    public geofencesPost(body: Geofence, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling geofencesPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Geofence>(`${this.basePath}/geofences`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Groups
     * Without any params, returns a list of the Groups the user belongs to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public groupsGet(all?: boolean, userId?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Group>>;
    public groupsGet(all?: boolean, userId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Group>>>;
    public groupsGet(all?: boolean, userId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Group>>>;
    public groupsGet(all?: boolean, userId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Group>>(`${this.basePath}/groups`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Group
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public groupsIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public groupsIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public groupsIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public groupsIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling groupsIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/groups/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Group
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public groupsIdPut(id: number, body: Group, observe?: 'body', reportProgress?: boolean): Observable<Group>;
    public groupsIdPut(id: number, body: Group, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Group>>;
    public groupsIdPut(id: number, body: Group, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Group>>;
    public groupsIdPut(id: number, body: Group, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling groupsIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling groupsIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Group>(`${this.basePath}/groups/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Group
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public groupsPost(body: Group, observe?: 'body', reportProgress?: boolean): Observable<Group>;
    public groupsPost(body: Group, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Group>>;
    public groupsPost(body: Group, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Group>>;
    public groupsPost(body: Group, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling groupsPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Group>(`${this.basePath}/groups`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Maintenances
     * Without params, it returns a list of Maintenances the user has access to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param deviceId Standard users can use this only with _deviceId_s, they have access to
     * @param groupId Standard users can use this only with _groupId_s, they have access to
     * @param refresh 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public maintenancesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<Maintenance>>;
    public maintenancesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Maintenance>>>;
    public maintenancesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Maintenance>>>;
    public maintenancesGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (groupId !== undefined) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
        }
        if (refresh !== undefined) {
            queryParameters = queryParameters.set('refresh', <any>refresh);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Maintenance>>(`${this.basePath}/maintenances`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Maintenance
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public maintenancesIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public maintenancesIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public maintenancesIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public maintenancesIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling maintenancesIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/maintenances/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Maintenance
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public maintenancesIdPut(id: number, body: Maintenance, observe?: 'body', reportProgress?: boolean): Observable<Maintenance>;
    public maintenancesIdPut(id: number, body: Maintenance, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Maintenance>>;
    public maintenancesIdPut(id: number, body: Maintenance, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Maintenance>>;
    public maintenancesIdPut(id: number, body: Maintenance, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling maintenancesIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling maintenancesIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Maintenance>(`${this.basePath}/maintenances/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Maintenance
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public maintenancesPost(body: Maintenance, observe?: 'body', reportProgress?: boolean): Observable<Maintenance>;
    public maintenancesPost(body: Maintenance, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Maintenance>>;
    public maintenancesPost(body: Maintenance, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Maintenance>>;
    public maintenancesPost(body: Maintenance, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling maintenancesPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Maintenance>(`${this.basePath}/maintenances`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Notifications
     * Without params, it returns a list of Notifications the user has access to
     * @param all Can only be used by admins or managers to fetch all entities
     * @param userId Standard users can use this only with their own _userId_
     * @param deviceId Standard users can use this only with _deviceId_s, they have access to
     * @param groupId Standard users can use this only with _groupId_s, they have access to
     * @param refresh 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public notificationsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<Notification>>;
    public notificationsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Notification>>>;
    public notificationsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Notification>>>;
    public notificationsGet(all?: boolean, userId?: number, deviceId?: number, groupId?: number, refresh?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (all !== undefined) {
            queryParameters = queryParameters.set('all', <any>all);
        }
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (groupId !== undefined) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
        }
        if (refresh !== undefined) {
            queryParameters = queryParameters.set('refresh', <any>refresh);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Notification>>(`${this.basePath}/notifications`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Notification
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public notificationsIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public notificationsIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public notificationsIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public notificationsIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationsIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/notifications/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Notification
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public notificationsIdPut(id: number, body: Notification, observe?: 'body', reportProgress?: boolean): Observable<Notification>;
    public notificationsIdPut(id: number, body: Notification, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Notification>>;
    public notificationsIdPut(id: number, body: Notification, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Notification>>;
    public notificationsIdPut(id: number, body: Notification, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationsIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling notificationsIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Notification>(`${this.basePath}/notifications/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a Notification
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public notificationsPost(body: Notification, observe?: 'body', reportProgress?: boolean): Observable<Notification>;
    public notificationsPost(body: Notification, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Notification>>;
    public notificationsPost(body: Notification, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Notification>>;
    public notificationsPost(body: Notification, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling notificationsPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Notification>(`${this.basePath}/notifications`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Send test notification to current user via Email and SMS
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public notificationsTestPost(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public notificationsTestPost(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public notificationsTestPost(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public notificationsTestPost(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.post<any>(`${this.basePath}/notifications/test`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of available Notification types
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public notificationsTypesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<NotificationType>>;
    public notificationsTypesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<NotificationType>>>;
    public notificationsTypesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<NotificationType>>>;
    public notificationsTypesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<NotificationType>>(`${this.basePath}/notifications/types`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Unlink an Object from another Object
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public permissionsDelete(body: Permission, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public permissionsDelete(body: Permission, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public permissionsDelete(body: Permission, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public permissionsDelete(body: Permission, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling permissionsDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.delete<any>(`${this.basePath}/permissions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Link an Object to another Object
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public permissionsPost(body: Permission, observe?: 'body', reportProgress?: boolean): Observable<Permission>;
    public permissionsPost(body: Permission, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Permission>>;
    public permissionsPost(body: Permission, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Permission>>;
    public permissionsPost(body: Permission, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling permissionsPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Permission>(`${this.basePath}/permissions`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetches a list of Positions
     * Without any params, it returns a list of last known positions for all the user&#39;s Devices. _from_ and _to_ fields are not required with _id_
     * @param deviceId _deviceId_ is optional, but requires the _from_ and _to_ parameters when used
     * @param from in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param to in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param id To fetch one or more positions. Multiple params can be passed like &#x60;id&#x3D;31&amp;id&#x3D;42&#x60;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public positionsGet(deviceId?: number, from?: Date, to?: Date, id?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Position>>;
    public positionsGet(deviceId?: number, from?: Date, to?: Date, id?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Position>>>;
    public positionsGet(deviceId?: number, from?: Date, to?: Date, id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Position>>>;
    public positionsGet(deviceId?: number, from?: Date, to?: Date, id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId !== undefined) {
            queryParameters = queryParameters.set('deviceId', <any>deviceId);
        }
        if (from !== undefined) {
            queryParameters = queryParameters.set('from', <any>from.toISOString());
        }
        if (to !== undefined) {
            queryParameters = queryParameters.set('to', <any>to.toISOString());
        }
        if (id !== undefined) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/csv',
            'application/gpx+xml'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'text/csv',
            'application/gpx+xml'
        ];

        return this.httpClient.get<Array<Position>>(`${this.basePath}/positions`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Events within the time period for the Devices or Groups
     * At least one _deviceId_ or one _groupId_ must be passed
     * @param from in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param to in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param deviceId 
     * @param groupId 
     * @param type % can be used to return events of all types
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportsEventsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, type?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<Array<Event>>;
    public reportsEventsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, type?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Event>>>;
    public reportsEventsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, type?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Event>>>;
    public reportsEventsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, type?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling reportsEventsGet.');
        }
        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling reportsEventsGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId) {
            deviceId.forEach((element) => {
                queryParameters = queryParameters.append('deviceId', <any>element);
            })
        }
        if (groupId) {
            groupId.forEach((element) => {
                queryParameters = queryParameters.append('groupId', <any>element);
            })
        }
        if (type) {
            type.forEach((element) => {
                queryParameters = queryParameters.append('type', <any>element);
            })
        }
        if (from !== undefined) {
            queryParameters = queryParameters.set('from', <any>from.toISOString());
        }
        if (to !== undefined) {
            queryParameters = queryParameters.set('to', <any>to.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        return this.httpClient.get<Array<Event>>(`${this.basePath}/reports/events`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Positions within the time period for the Devices or Groups
     * At least one _deviceId_ or one _groupId_ must be passed
     * @param from in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param to in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param deviceId 
     * @param groupId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportsRouteGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<Array<Position>>;
    public reportsRouteGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Position>>>;
    public reportsRouteGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Position>>>;
    public reportsRouteGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling reportsRouteGet.');
        }
        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling reportsRouteGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId) {
            deviceId.forEach((element) => {
                queryParameters = queryParameters.append('deviceId', <any>element);
            })
        }
        if (groupId) {
            groupId.forEach((element) => {
                queryParameters = queryParameters.append('groupId', <any>element);
            })
        }
        if (from !== undefined) {
            queryParameters = queryParameters.set('from', <any>from.toISOString());
        }
        if (to !== undefined) {
            queryParameters = queryParameters.set('to', <any>to.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        return this.httpClient.get<Array<Position>>(`${this.basePath}/reports/route`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of ReportStops within the time period for the Devices or Groups
     * At least one _deviceId_ or one _groupId_ must be passed
     * @param from in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param to in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param deviceId 
     * @param groupId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportsStopsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<Array<ReportStops>>;
    public reportsStopsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReportStops>>>;
    public reportsStopsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReportStops>>>;
    public reportsStopsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling reportsStopsGet.');
        }
        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling reportsStopsGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId) {
            deviceId.forEach((element) => {
                queryParameters = queryParameters.append('deviceId', <any>element);
            })
        }
        if (groupId) {
            groupId.forEach((element) => {
                queryParameters = queryParameters.append('groupId', <any>element);
            })
        }
        if (from !== undefined) {
            queryParameters = queryParameters.set('from', <any>from.toISOString());
        }
        if (to !== undefined) {
            queryParameters = queryParameters.set('to', <any>to.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        return this.httpClient.get<Array<ReportStops>>(`${this.basePath}/reports/stops`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of ReportSummary within the time period for the Devices or Groups
     * At least one _deviceId_ or one _groupId_ must be passed
     * @param from in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param to in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param deviceId 
     * @param groupId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportsSummaryGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<Array<ReportSummary>>;
    public reportsSummaryGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReportSummary>>>;
    public reportsSummaryGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReportSummary>>>;
    public reportsSummaryGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling reportsSummaryGet.');
        }
        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling reportsSummaryGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId) {
            deviceId.forEach((element) => {
                queryParameters = queryParameters.append('deviceId', <any>element);
            })
        }
        if (groupId) {
            groupId.forEach((element) => {
                queryParameters = queryParameters.append('groupId', <any>element);
            })
        }
        if (from !== undefined) {
            queryParameters = queryParameters.set('from', <any>from.toISOString());
        }
        if (to !== undefined) {
            queryParameters = queryParameters.set('to', <any>to.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        return this.httpClient.get<Array<ReportSummary>>(`${this.basePath}/reports/summary`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of ReportTrips within the time period for the Devices or Groups
     * At least one _deviceId_ or one _groupId_ must be passed
     * @param from in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param to in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param deviceId 
     * @param groupId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportsTripsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<Array<ReportTrips>>;
    public reportsTripsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReportTrips>>>;
    public reportsTripsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReportTrips>>>;
    public reportsTripsGet(from: Date, to: Date, deviceId?: Array<number>, groupId?: Array<number>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling reportsTripsGet.');
        }
        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling reportsTripsGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceId) {
            deviceId.forEach((element) => {
                queryParameters = queryParameters.append('deviceId', <any>element);
            })
        }
        if (groupId) {
            groupId.forEach((element) => {
                queryParameters = queryParameters.append('groupId', <any>element);
            })
        }
        if (from !== undefined) {
            queryParameters = queryParameters.set('from', <any>from.toISOString());
        }
        if (to !== undefined) {
            queryParameters = queryParameters.set('to', <any>to.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        return this.httpClient.get<Array<ReportTrips>>(`${this.basePath}/reports/trips`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Server information
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public serverGet(observe?: 'body', reportProgress?: boolean): Observable<Server>;
    public serverGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Server>>;
    public serverGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Server>>;
    public serverGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Server>(`${this.basePath}/server`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Server information
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public serverPut(body: Server, observe?: 'body', reportProgress?: boolean): Observable<Server>;
    public serverPut(body: Server, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Server>>;
    public serverPut(body: Server, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Server>>;
    public serverPut(body: Server, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling serverPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Server>(`${this.basePath}/server`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Close the Session
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sessionDelete(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public sessionDelete(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public sessionDelete(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public sessionDelete(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/session`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Session information
     * 
     * @param token 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sessionGet(token?: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public sessionGet(token?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public sessionGet(token?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public sessionGet(token?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (token !== undefined) {
            queryParameters = queryParameters.set('token', <any>token);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        return this.httpClient.get<User>(`${this.basePath}/session`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a new Session
     * 
     * @param email 
     * @param password 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sessionPost(email: string, password: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public sessionPost(email: string, password: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public sessionPost(email: string, password: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public sessionPost(email: string, password: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling sessionPost.');
        }
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling sessionPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (email !== undefined) {
            formParams = formParams.append('email', <any>email) || formParams;
        }
        if (password !== undefined) {
            formParams = formParams.append('password', <any>password) || formParams;
        }

        return this.httpClient.post<User>(`${this.basePath}/session`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch server Statistics
     * 
     * @param from in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param to in IS0 8601 format. eg. &#x60;1963-11-22T18:30:00Z&#x60;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public statisticsGet(from: Date, to: Date, observe?: 'body', reportProgress?: boolean): Observable<Array<Statistics>>;
    public statisticsGet(from: Date, to: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Statistics>>>;
    public statisticsGet(from: Date, to: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Statistics>>>;
    public statisticsGet(from: Date, to: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling statisticsGet.');
        }
        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling statisticsGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (from !== undefined) {
            queryParameters = queryParameters.set('from', <any>from.toISOString());
        }
        if (to !== undefined) {
            queryParameters = queryParameters.set('to', <any>to.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Statistics>>(`${this.basePath}/statistics`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch a list of Users
     * 
     * @param userId Can only be used by admin or manager users
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersGet(userId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<User>>;
    public usersGet(userId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<User>>>;
    public usersGet(userId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<User>>>;
    public usersGet(userId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (userId !== undefined) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<User>>(`${this.basePath}/users`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a User
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public usersIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public usersIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public usersIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/users/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a User
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersIdPut(id: number, body: User, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public usersIdPut(id: number, body: User, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public usersIdPut(id: number, body: User, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public usersIdPut(id: number, body: User, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling usersIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<User>(`${this.basePath}/users/${encodeURIComponent(String(id))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a User
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersPost(body: User, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public usersPost(body: User, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public usersPost(body: User, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public usersPost(body: User, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling usersPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<User>(`${this.basePath}/users`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
