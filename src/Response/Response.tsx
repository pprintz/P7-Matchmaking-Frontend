/* 
Common format of a response from the server 
Tdata is the format of the data retrieved from the server.
Ideally an interface, but can be other types (if single values are returned)

VERY BASIC

See example of implementation in Group/GroupResponse and Group/GroupPageContainer
*/
export default class Response<Tdata>{
    public readonly statuscode : number;
    public readonly error : string;
    public data : Tdata;

    public constructor(response : any)
    {
        this.statuscode = response.statuscode;
        this.error = response.error;
        this.data = response.data;
    }
};
