import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ChildEntity } from 'typeorm';

@Injectable()
export class ExternalService {
  constructor(private readonly httpService: HttpService) { }

  async getDniInfo(dni: string): Promise<any> {
    const token = process.env.APIS_TOKEN;
    const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;

    try {
      const response = await this.httpService.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Referer': 'https://apis.net.pe/consulta-dni-api',
          },
        }).pipe(map(response => response.data)).toPromise();
      if (!response || 
        !response.nombres || 
        !response.apellidoPaterno || 
        !response.apellidoMaterno) {
        throw new HttpException('Invalid response from external service', 
          HttpStatus.INTERNAL_SERVER_ERROR);
      }
      console.log(response, 'aqui esta la data')

      return { 
        nombres: response.nombres, 
        apellidoPaterno: response.apellidoPaterno, 
        apellidoMaterno: response.apellidoMaterno, 
      };
    } catch (error) {
      throw new HttpException('Failed to fetch DNI info', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
