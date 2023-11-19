import { DataSource } from 'typeorm'
import * as Dotenv from 'dotenv'
import * as path from 'path'

import { Scrutiny } from '@/helpers/models/entities/scrutinyEntity'
import { VotingTable } from '@/helpers/models/entities/votingTableEntity'
import { EnvironmentSelector } from '@/_core/configs/environmentSelector'
import { Initial1700380147729 } from '@/helpers/migrations/1700380147729-initial'

Dotenv.config({
    path: `${path.join(__dirname)}/${EnvironmentSelector()}`,
}).parsed

console.log(
    `TYPEORM ENVIRONMENT: ${process.env.LBERTAPP_ENV}\nDATABASE CONNECTION: ${process.env.DATABASE_RW_HOST}`
)

export const ConnectionSourceRW = new DataSource({
    migrationsTableName: 'migrations',
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_RW_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB,
    logging: process.env.DATABASE_LOGGING === 'true',
    synchronize: process.env.DATABASE_SYNC === 'true',
    ssl: true,
    extra: {
    	ssl: {
    		rejectUnauthorized: false
    	}
    },
    entities: [
			Scrutiny,
			VotingTable
		],
    migrations: [
			Initial1700380147729
		],
})
