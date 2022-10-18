import { GqlExecutionContext } from '@nestjs/graphql'
import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class FirebaseGuard extends AuthGuard('firebase-auth') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    //Doorgeven van de REST (post) naar GraphQL
    console.log(ctx)
    return ctx.getContext().req
  }
}
