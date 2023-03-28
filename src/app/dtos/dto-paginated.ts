import { DtoSecret } from './dto-secret';
export class DtoPaginated {

    public content:DtoSecret []  = [];
    public pageable: Pageable | null  =null;        //-- Class
    public last: boolean | undefined;
    public totalPages: number | undefined;
    public totalElements: number | undefined;
    public size: number | undefined;
    public number:number | undefined;
    public sort: Sort | null=null;                  //-- Class
    public first: boolean | undefined;
    public numberOfElements: number | undefined;
    public empty: boolean | undefined;

    
    
}

class Pageable {
    public sort:Sort | undefined;   //-- Class   
    public offset:number | undefined; 
    public pageSize:number | undefined; 
    public pageNumber:number | undefined; 
    public paged :boolean | undefined;
    public unpaged :boolean | undefined;
    
}

class Sort{
    public empty :boolean | undefined;
    public sorted :boolean | undefined;
    public unsorted :boolean | undefined;

}


