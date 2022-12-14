import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as Joi from 'joi';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';
import { NotifierModule } from './notifier/notifier.module';
import { TeamModule } from './team/team.module';
import { Team } from './team/entities/team.entity';
import { Match } from './match/entities/match.entity';
import { MatchModule } from './match/match.module';
import { MatchReport } from './match/entities/match-report.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        TOKEN_SECRET: Joi.string().required(),
      }),
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.dev'
          : process.env.NODE_ENV === 'test'
          ? '.env.test'
          : '.env.prod',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as MysqlConnectionOptions['type'],
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Verification, Team, Match, MatchReport],
      synchronize: process.env.NODE_ENV === 'dev',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req, connection }) => {
        return {
          user: req['user'],
        };
      },
    }),
    JwtModule.forRoot({
      privateKey: process.env.TOKEN_SECRET,
    }),
    NotifierModule.forRoot({}),
    AuthModule,
    UsersModule,
    TeamModule,
    MatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}
