import { DtoCategoria } from './dto-categoria';
export class DtoSecret {
    id: number| undefined;
    secreto:String | undefined;
    entityCategoria: DtoCategoria  |undefined;
    categoria:String | undefined;
    fCreacion: String| undefined;
}

