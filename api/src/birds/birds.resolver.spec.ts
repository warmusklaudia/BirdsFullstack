import { Test, TestingModule } from '@nestjs/testing'
import { BirdsResolver } from './birds.resolver'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import { CreateBird, CreateBirdInputStub } from './stubs/bird.stub'
import { ObjectId } from 'mongodb'
import { ClientMessage, MessageTypes } from '../entities/ClientMessage'

describe('BirdsResolver', () => {
  let resolver: BirdsResolver
  let service: BirdsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsResolver,
        //BirdsService,
        {
          provide: BirdsService,
          useValue: {
            create: jest.fn().mockResolvedValue(CreateBird()),
            findAll: jest.fn().mockResolvedValue([CreateBird()]),
            findOne: jest.fn().mockResolvedValue(CreateBird()),
            update: jest.fn().mockResolvedValue(CreateBird()),
            remove: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile()

    resolver = module.get<BirdsResolver>(BirdsResolver)
    service = module.get<BirdsService>(BirdsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createBird', () => {
    let createBirdDTO: CreateBirdInput
    let resultBird: Bird

    beforeEach(async () => {
      createBirdDTO = CreateBirdInputStub()
      resultBird = await resolver.createBird(createBirdDTO)
    })

    describe('when createBird is called', () => {
      it('should call the service create method', async () => {
        expect(service.create).toBeCalledTimes(1)
      })

      it('should return the created bird', async () => {
        expect(resultBird).toEqual(CreateBird())
      })
    })
  })
  describe('findAll', () => {
    let resultBirds: Bird[]
    beforeEach(async () => {
      resultBirds = await resolver.findAll()
    })

    describe('when findAll is called', () => {
      it('should call birdsService findAll', async () => {
        expect(service.findAll).toBeCalledTimes(1)
      })

      it('should return the array of bird(s)', async () => {
        expect(resultBirds).toEqual([CreateBird()])
      })
    })
  })
  describe('findOne', () => {
    let resultBird: Bird
    beforeEach(async () => {
      resultBird = await resolver.findOne(CreateBird().id)
    })

    describe('Check service findOne implementation', () => {
      it('should call birdsService.findOne correct', async () => {
        expect(service.findOne).toBeCalledTimes(1)
        expect(service.findOne).toBeCalledWith(CreateBird().id)
      })

      it('should return the created bird', async () => {
        expect(resultBird).toEqual(CreateBird())
      })
    })
  })
  describe('updateBird', () => {
    let resultBird: Bird
    beforeEach(async () => {
      resultBird = await resolver.updateBird(CreateBird())
    })

    describe('when updateBird is called', () => {
      it('should call birdsService.update correct', async () => {
        expect(service.update).toBeCalledTimes(1)
        expect(service.update).toBeCalledWith(CreateBird().id, CreateBird())
      })

      it('should return the updated bird', async () => {
        expect(resultBird).toEqual(CreateBird())
      })
    })
  })

  describe('removeBird', () => {
    let result: ClientMessage
    beforeEach(async () => {
      result = await resolver.removeBird(CreateBird().id)
    })

    describe('Check the service implementation', () => {
      it('should call birdsService.remove correct', async () => {
        expect(service.remove).toBeCalledTimes(1)
        expect(service.remove).toBeCalledWith(new ObjectId(CreateBird().id))
      })
    })

    describe('Check the GraphQL return', () => {
      it('Is the message clear to the frontend?', () => {
        const expectedResult: ClientMessage = {
          type: MessageTypes.success,
          message: 'Bird deleted',
          statusCode: 200,
        }
        expect(result).toEqual(expectedResult)
      })

      it('should return the correct error message', async () => {
        jest.spyOn(service, 'remove').mockResolvedValue({ affected: 1000, raw: '' })
        result = await resolver.removeBird(CreateBird().id)
        const expectedResult: ClientMessage = {
          type: MessageTypes.error,
          message: 'Delete action went very wrong',
          statusCode: 400,
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
