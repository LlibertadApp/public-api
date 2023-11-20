import 'reflect-metadata';
import { Scrutiny } from "@/helpers/models/entities/scrutinyEntity";
import { Repository } from "typeorm";
import { ConnectionSourceRW } from '../../../ormconfig-rw';

/**
{
  "conteoLla": "141",
  "conteoUp": "91",
  "estado": "ENVIADO",
  "imagenActa": "actas/06-022-00126-00281-2595_20231119-224530_e9c2a959.jpg",
  "mesaId": "06-022-00126-00281-2595",
  "sobres": "234",
  "userId": "3783d693-4a80-486b-8b4c-d982880b796c",
  "votantes": "234",
  "votosEnBlanco": "1",
  "votosEnTotal": "234",
  "votosImpugnados": "0",
  "votosNulos": "1",
  "votosRecurridos": "0"
}
*/

export const updateScrutinyFromBackend = async (payload: any): Promise<void> => {
    try {
        if (!ConnectionSourceRW.isInitialized) {
            await ConnectionSourceRW.initialize();
            console.log('Database connected (RW)');
        } else {
          console.log('Re-using connection (RW)');
        }

        const scrutinyRepository: Repository<Scrutiny> = ConnectionSourceRW.getRepository(Scrutiny);

        const scrutiny = await scrutinyRepository.update({
          id: payload.mesaId
        }, {
            votesPartyA: parseInt(payload.conteoLla),
            votesPartyB: parseInt(payload.conteoUp),
            votesTotal: parseInt(payload.votosEnTotal),
            blank: parseInt(payload.votosEnBlanco),
            impugned: parseInt(payload.votosImpugnados),
            // scrutiny.command = parseInt(payload.comando)
            appealed: parseInt(payload.votosRecurridos),
            // scrutiny.challengedIdentity = parseInt(payload.conteoUp)
            nullVotes: parseInt(payload.votosNulos),
            voters: parseInt(payload.votantes),
            voted: parseInt(payload.sobres),
        });
    } catch (error) {
        console.error('Error in updateScrutinyFromBackend:', error);
    }
};
