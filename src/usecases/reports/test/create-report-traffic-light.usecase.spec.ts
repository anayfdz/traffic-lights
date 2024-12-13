// import { Test, TestingModule } from '@nestjs/testing';
// import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';
// import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
// import { CreateReportDto } from 'src/infrastructure/common/dto/report/create-report.dto';
// import { NotFoundException } from '@nestjs/common';
// import { ReportTrafficLightUseCase } from '../create-report-traffic-light.usecase';
// import { CreateTrafficLightUseCase } from 'src/usecases/traffic-lights/create-traffic-light.usecase';

// describe('ReportTrafficLightUseCase', () => {
//   let reportTrafficLightUseCase: ReportTrafficLightUseCase;
//   let reportRepositoryMock: Partial<IReportRepository>;
//   let trafficLightRepositoryMock: Partial<ITrafficLightRepository>;
//   let createTrafficLightUseCaseMock: Partial<CreateTrafficLightUseCase>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ReportTrafficLightUseCase,
//         {
//           provide: 'IReportRepository',
//           useValue: {
//             createReport: jest.fn(),
//           },
//         },
//         {
//           provide: 'ITrafficLightRepository',
//           useValue: {
//             findById: jest.fn(),
//           },
//         },
//         {
//           provide: CreateTrafficLightUseCase,
//           useValue: {
//             execute: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     reportTrafficLightUseCase = module.get<ReportTrafficLightUseCase>(ReportTrafficLightUseCase);
//     reportRepositoryMock = module.get<IReportRepository>('IReportRepository');
//     trafficLightRepositoryMock = module.get<ITrafficLightRepository>('ITrafficLightRepository');
//     createTrafficLightUseCaseMock = module.get<CreateTrafficLightUseCase>(CreateTrafficLightUseCase);
//   });

//   it('should be defined', () => {
//     expect(reportTrafficLightUseCase).toBeDefined();
//   });

//   it('should create a report with an existing traffic light', async () => {
//     const createReportDto: CreateReportDto = {
//       traffic_light_id: 1,
//       status: 'funcionando',
//       description: 'Test report',
//       comments: 'Test comments',
//       reported_at: new Date(),
//       evidences: [],
//     };

//     const mockTrafficLight = { id: 1, type: 'semaforo', latitude: 10, longitude: 20 }; // Simulando un semáforo existente
//     trafficLightRepositoryMock.findById = jest.fn().mockResolvedValue(mockTrafficLight);
//     reportRepositoryMock.createReport = jest.fn().mockResolvedValue({ id: 1, ...createReportDto, trafficLight: mockTrafficLight });

//     const result = await reportTrafficLightUseCase.execute(57, createReportDto);

//     expect(trafficLightRepositoryMock.findById).toHaveBeenCalledWith(createReportDto.traffic_light_id);
//     expect(reportRepositoryMock.createReport).toHaveBeenCalledWith(expect.objectContaining({ status: 'funcionando' }));
//     expect(result).toEqual({ id: 1, ...createReportDto, trafficLight: mockTrafficLight });
//   });

//   it('should create a report and a new traffic light if not provided', async () => {
//     const createReportDto: CreateReportDto = {
//       status: 'funcionando',
//       description: 'Test report',
//       comments: 'Test comments',
//       reported_at: new Date(),
//       evidences: [],
//       latitude: 10,
//       longitude: 20,
//       type: 'semaforo',
//       department: 'departamento',
//       province: 'provincia',
//       district: 'distrito',
//     };

//     const newTrafficLight = { id: 1, type: 'semaforo', latitude: 10, longitude: 20 };
//     createTrafficLightUseCaseMock.execute = jest.fn().mockResolvedValue(newTrafficLight);
//     reportRepositoryMock.createReport = jest.fn().mockResolvedValue({ id: 1, ...createReportDto, trafficLight: newTrafficLight });

//     const result = await reportTrafficLightUseCase.execute(57, createReportDto);

//     expect(createTrafficLightUseCaseMock.execute).toHaveBeenCalledWith(expect.objectContaining({
//       latitude: 10,
//       longitude: 20,
//       type: 'semaforo',
//     }));
//     expect(reportRepositoryMock.createReport).toHaveBeenCalledWith(expect.objectContaining({ status: 'funcionando' }));
//     expect(result).toEqual({ id: 1, ...createReportDto, trafficLight: newTrafficLight });
//   });

//   it('should throw NotFoundException if traffic light is not found', async () => {
//     const createReportDto: CreateReportDto = {
//       traffic_light_id: 999, // ID de semáforo que no existe
//       status: 'funcionando',
//       description: 'Test report',
//       comments: 'Test comments',
//       reported_at: new Date(),
//       evidences: [],
//     };

//     trafficLightRepositoryMock.findById = jest.fn().mockResolvedValue(null); // No se encuentra el semáforo

//     await expect(reportTrafficLightUseCase.execute(57, createReportDto))
//       .rejects
//       .toThrowError(new NotFoundException('Traffic Light not found'));
//   });

//   it('should throw an error if creating the traffic light fails', async () => {
//     const createReportDto: CreateReportDto = {
//       status: 'funcionando',
//       description: 'Test report',
//       comments: 'Test comments',
//       reported_at: new Date(),
//       evidences: [],
//       latitude: 10,
//       longitude: 20,
//       type: 'semaforo',
//       department: 'departamento',
//       province: 'provincia',
//       district: 'distrito',
//     };

//     createTrafficLightUseCaseMock.execute = jest.fn().mockRejectedValue(new Error('Error creating traffic light'));

//     await expect(reportTrafficLightUseCase.execute(57, createReportDto))
//       .rejects
//       .toThrowError(new Error('Error al crear semáforo'));
//   });

//   it('should throw an error if creating the report fails', async () => {
//     const createReportDto: CreateReportDto = {
//       status: 'funcionando',
//       description: 'Test report',
//       comments: 'Test comments',
//       reported_at: new Date(),
//       evidences: [],
//       traffic_light_id: 1,
//     };

//     const mockTrafficLight = { id: 1, type: 'semaforo', latitude: 10, longitude: 20 };
//     trafficLightRepositoryMock.findById = jest.fn().mockResolvedValue(mockTrafficLight);
//     reportRepositoryMock.createReport = jest.fn().mockRejectedValue(new Error('Error creating report'));

//     await expect(reportTrafficLightUseCase.execute(57, createReportDto))
//       .rejects
//       .toThrowError(new Error('Error al crear el reporte'));
//   });
// });
