// import { Test, TestingModule } from '@nestjs/testing';
// import { TrafficLightM } from '../../../domain/model/traffic-lights/trafficLight';
// import { NearbyTrafficLightsDto } from 'src/infrastructure/common/dto/traffic-lights/nearby-traffic-lights.dto';
// import { GetNearbyTrafficLightsUseCase } from '../get-nearby-traffic-lights.usecase';

// class MockTrafficLightRepository {
//   findNearby(latitude: number, longitude: number, radius: number): Promise<TrafficLightM[]> {
//     return Promise.resolve([
//       new TrafficLightM(
//         1,
//         -34.6000,
//         -58.3800,
//         'Red',
//         'Department 1',
//         'Province 1',
//         'District 1',
//         { latitude: -34.6000, longitude: -58.3800 },
//         new Date(),
//         new Date(),
//       ),
//       new TrafficLightM(
//         2,
//         -34.6040,
//         -58.3820,
//         'Green',
//         'Department 2',
//         'Province 2',
//         'District 2',
//         { latitude: -34.6040, longitude: -58.3820 },
//         new Date(),
//         new Date(),
//       ),
//     ]);
//   }
// }

// describe('GetNearbyTrafficLightsUseCase', () => {
//   let useCase: GetNearbyTrafficLightsUseCase;
//   let trafficLightRepository: MockTrafficLightRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         GetNearbyTrafficLightsUseCase,
//         {
//           provide: 'ITrafficLightRepository',
//           useClass: MockTrafficLightRepository,
//         },
//       ],
//     }).compile();

//     useCase = module.get<GetNearbyTrafficLightsUseCase>(GetNearbyTrafficLightsUseCase);
//     trafficLightRepository = module.get<MockTrafficLightRepository>(MockTrafficLightRepository);
//   });

//   it('should be defined', () => {
//     expect(useCase).toBeDefined();
//   });

//   it('should return nearby traffic lights when valid parameters are provided', async () => {
//     const mockDto: NearbyTrafficLightsDto = {
//       latitude: -34.6037,
//       longitude: -58.3816,
//       radius: 10,
//     };

//     const findNearbySpy = jest.spyOn(trafficLightRepository, 'findNearby');

//     const result = await useCase.execute(mockDto);

//     expect(findNearbySpy).toHaveBeenCalledWith(
//       mockDto.latitude,
//       mockDto.longitude,
//       mockDto.radius,
//     );

//     expect(result).toEqual([
//       new TrafficLightM(
//         1,
//         -34.6000,
//         -58.3800,
//         'Red',
//         'Department 1',
//         'Province 1',
//         'District 1',
//         { latitude: -34.6000, longitude: -58.3800 },
//         expect.any(Date),
//         expect.any(Date),
//       ),
//       new TrafficLightM(
//         2,
//         -34.6040,
//         -58.3820,
//         'Green',
//         'Department 2',
//         'Province 2',
//         'District 2',
//         { latitude: -34.6040, longitude: -58.3820 },
//         expect.any(Date),
//         expect.any(Date),
//       ),
//     ]);
//   });

//   it('should throw an error if radius is out of bounds', async () => {
//     const mockDto: NearbyTrafficLightsDto = {
//       latitude: -34.6037,
//       longitude: -58.3816,
//       radius: 100,  // Fuera del rango permitido (0-50)
//     };

//     await expect(useCase.execute(mockDto)).rejects.toThrowError(
//       'El radio debe ser mayor que 0 y menor que 50 km',
//     );
//   });
// });
