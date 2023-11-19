/// <reference path="../symbols.d.ts" />
import 'reflect-metadata'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { object, string, array } from 'yup'
import { Repository } from 'typeorm'

import response from '@/helpers/response'
import { httpErrors, httpStatusCodes } from '@/_core/configs/errorConstants'
import { Scrutiny } from '@/helpers/models/entities/scrutinyEntity'
import { SummaryResponse } from '@/types/api-types.d'

import { ConnectionSource } from '@/../ormconfig'

export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
): Promise<any> => {
    global.cb = callback

    // This enables Lambda function to complete
    context.callbackWaitsForEmptyEventLoop = false

    try {
        if (!ConnectionSource.isInitialized) {
            await ConnectionSource.initialize()
            console.log('Database connected (RO)')
        } else {
            console.log('Re-using connection (RO)')
        }

        const establishmentId = event.queryStringParameters?.establishmentId
        const sectionId = event.queryStringParameters?.sectionId
        const subsectionId = event.queryStringParameters?.subsectionId
        const circuitId = event.queryStringParameters?.circuitId
        const districtId = event.queryStringParameters?.districtId

        const query = ConnectionSource.createQueryBuilder(Scrutiny, 'scrutiny')
            .select('SUM(scrutiny.votesTotal)::int', 'votesTotal')
            .addSelect('SUM(scrutiny.votesPartyA)::int', 'votesPartyA')
            .addSelect('SUM(scrutiny.votesPartyB)::int', 'votesPartyB')
            .addSelect('SUM(scrutiny.blank)::int', 'blank')
            .addSelect('SUM(scrutiny.impugned)::int', 'impugned')
            .addSelect('SUM(scrutiny.command)::int', 'command')
            .addSelect('SUM(scrutiny.appealed)::int', 'appealed')
            .addSelect('SUM(scrutiny.challengedIdentity)::int', 'challengedIdentity')
            .addSelect('SUM(scrutiny.nullVotes)::int', 'nullVotes')
            .where('scrutiny.votesTotal > 0')

        if (establishmentId) {
            query.andWhere('scrutiny.establishmentId = :establishmentId', {
                establishmentId: establishmentId,
            })
        }

        if (sectionId) {
            query.andWhere('scrutiny.sectionId = :sectionId', {
                sectionId: sectionId,
            })
        }

        if (subsectionId) {
            query.andWhere('scrutiny.subsectionId = :subsectionId', {
                subsectionId: subsectionId,
            })
        }

        if (circuitId) {
            query.andWhere('scrutiny.circuitId = :circuitId', {
                circuitId: circuitId,
            })
        }

        if (districtId) {
            query.andWhere('scrutiny.districtId = :districtId', {
                districtId: districtId,
            })
        }

        // query.cache(60000) // 1 minute
        const summary = await query.getRawOne() as SummaryResponse

        return response({
            code: httpStatusCodes.OK,
            data: summary,
        })
    } catch (error) {
        console.error(error)
        return response({
            code: httpStatusCodes.INTERNAL_SERVER_ERROR,
            err: httpErrors.INTERNAL_SERVER_ERROR,
        })
    }
}

export default handler
