export interface Diagnostico{
    iddiagnostico:number|null;
    fecha:number|null;
    descripcion:string|null;
    agendamiento_idagendamiento:number|string|null;
    agendamiento_paciente_ci: number|string|null;
    agendamiento_doctor_ci:number|string|null;
}