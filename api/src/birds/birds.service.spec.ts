import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BirdsService } from './birds.service'
import { Bird } from './entities/bird.entity'
import { CreateBird, CreateBirdInputStub } from './stubs/bird.stub'
import { ObjectId } from 'mongodb'

describe('BirdsService', () => {
  let service: BirdsService
  let mockBirdRepository: Repository<Bird>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsService,
        {
          provide: getRepositoryToken(Bird),
          useValue: {
            save: jest.fn().mockResolvedValue(CreateBird()),
            find: jest.fn().mockResolvedValue([CreateBird()]),
            findOne: jest.fn().mockResolvedValue(CreateBird()),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<BirdsService>(BirdsService)
    mockBirdRepository = module.get<Repository<Bird>>(getRepositoryToken(Bird))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when create is called', () => {
      it('should call the repository save method', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        const newBird = new Bird()
        await service.create(newBird)
        expect(saveSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        // const newBird = new Bird()
        const newBird = CreateBirdInputStub()
        await service.create(newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })

      it('should return the created bird', async () => {
        const newBird = CreateBirdInputStub()
        const toReturnBird = CreateBird()
        const result = await service.create(newBird)
        expect(result).toEqual(toReturnBird)
      })
    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      it('should call the repository find method', async () => {
        const findSpy = jest.spyOn(mockBirdRepository, 'find')
        await service.findAll()
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should return the list of birds', async () => {
        const toReturnBird = CreateBird()
        const result = await service.findAll()
        expect(result).toEqual([toReturnBird])
      })
    })
  })

  describe('findOne', () => {
    describe('when findOne is called', () => {
      it('should call the repository findOne method', async () => {
        const findSpy = jest.spyOn(mockBirdRepository, 'findOne')
        await service.findOne('71c2d2f850bb93f88d02271c')
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const findSpy = jest.spyOn(mockBirdRepository, 'findOne')
        await service.findOne('71c2d2f850bb93f88d02271c')
        expect(findSpy).toBeCalledWith(new ObjectId('71c2d2f850bb93f88d02271c'))
      })

      it('should return a bird', async () => {
        const toReturnBird = CreateBird()
        const result = await service.findOne('71c2d2f850bb93f88d02271c')
        expect(result).toEqual(toReturnBird)
      })
    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      it('shoulmd call the repository save method', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        const newBird = CreateBird()
        await service.update(newBird.id, newBird)
        expect(saveSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        const newBird = CreateBird()
        await service.update(newBird.id, newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })

      it('should return the updated bird', async () => {
        const newBird = CreateBird()
        const toReturnBird = CreateBird()
        const result = await service.update(newBird.id, newBird)
        expect(result).toEqual(toReturnBird)
      })
    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      it('should call the repository delete method', async () => {
        const deleteSpy = jest.spyOn(mockBirdRepository, 'delete')
        const newBird = CreateBird()
        await service.remove(newBird.id)
        expect(deleteSpy).toBeCalledTimes(1)
      })
    })
  })
})
