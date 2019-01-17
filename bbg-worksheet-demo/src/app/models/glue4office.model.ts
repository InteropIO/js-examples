export interface Glue4OfficeModel {
    word: boolean;
    outlook: boolean;
    excel: boolean;
    gateway: GlueGateway;
    auth: GlueAuth;
}

interface GlueGateway {
    ws: string;
    protocolVersion: number;
}

interface GlueAuth {
    username: string;
    password: string;
}
