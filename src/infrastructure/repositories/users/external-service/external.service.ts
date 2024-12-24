import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ChildEntity } from 'typeorm';

@Injectable()
export class ExternalService {
  constructor(private readonly httpService: HttpService) { }

  async getDniInfo(dni: string): Promise<any> {
    if (!dni) {
      throw new HttpException('DNI is required', HttpStatus.BAD_REQUEST);
    }
    const token = process.env.APIS_TOKEN;
    //const token = process.env.APIPERU_TOKEN;
    const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;
    //const url = `https://apiperu.dev/api/dni`

    try {
      const response = await this.httpService.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Referer': 'https://apis.net.pe/consulta-dni-api',
          },
        }).pipe(map((res) => res.data)).toPromise();
        if (response) {
          const data = response;
  
          return {
            numero: data.numeroDocumento,
            nombreCompleto: data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno,
            nombres: data.nombres,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno,
            codigoVerificacion: data.digitoVerificador,
          };
        } else {
          throw new HttpException('Invalid response from external service', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
      throw new HttpException('Failed to fetch DNI info', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
