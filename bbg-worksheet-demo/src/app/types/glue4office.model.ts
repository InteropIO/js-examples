export interface Glue4OfficeModel {
    gateway: GlueGateway;
    auth: GlueAuth;
    word: boolean;
    excel: boolean;
    outlook: boolean;
    glue?: any;
}

interface GlueGateway {
    ws: string;
    protocolVersion: number;
}

interface GlueAuth {
    username: string;
    password: string;
}
