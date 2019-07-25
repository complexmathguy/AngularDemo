/** 
	Base class of all Components.  
	For convenience, contains all enums and entity lists 
**/
export class BaseService {

    public ormUrl: string;

    constructor() {
        this.ormUrl = 'http://localhost:4000';
    }
}