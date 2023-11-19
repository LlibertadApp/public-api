import uuid
import random

def printHeader():
    print('INSERT INTO public."Scrutiny"(id, "createdAt", "updatedAt", "votesPartyA", "votesPartyB", "votesTotal", blank, impugned, command, appealed, "challengedIdentity", "nullVotes", uid, "establishmentId", "sectionId", "subsectionId", "circuitId", "districtId") VALUES ')


printHeader()
for num in range(1, 140000):
    votesA = random.randint(0, 250)
    votesB = random.randint(0, 250)
    blank = random.randint(0, 10)
    impugned = random.randint(0, 10)
    command = random.randint(0, 10)
    appealed = random.randint(0, 10)
    challengedIdentity = random.randint(0, 2)
    nullVotes = random.randint(0,5)
    votesTotal = votesA + votesB + blank + impugned + command + appealed + challengedIdentity + nullVotes
    id = uuid.uuid4()
    establishmentId = str(random.randint(1,250)).zfill(5)
    sectionId = str(random.randint(1,250)).zfill(5)
    subsectionId = str(random.randint(1,250)).zfill(5)
    circuitId = str(random.randint(1,250)).zfill(5)
    districtId = str(random.randint(1,250)).zfill(5)

    '''
    Numero de Electores
    Numero de Sobres
    '''

    print(f'(\'{str(id)}\', NOW(), NOW(), {votesA}, {votesB}, {votesTotal},  {blank}, {impugned}, {command}, {appealed}, {challengedIdentity}, {nullVotes}, \'{str(id)}\', {establishmentId}, {sectionId}, {subsectionId}, {circuitId}, {districtId})', end='')
    if num % 1000 == 0:
        print(';')
        printHeader()
    else:
        print(',')
