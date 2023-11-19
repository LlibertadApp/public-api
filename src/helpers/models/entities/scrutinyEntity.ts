import {
    Column,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'Scrutiny' })
export class Scrutiny {
    @PrimaryColumn()
    public id: string

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date

    @Column({ nullable: false })
    public votesPartyA: number

    @Column({ nullable: false })
    public votesPartyB: number

    @Column({ nullable: false })
    public votesTotal: number

    @Column({ nullable: false })
    public blank: number

    @Column({ nullable: false })
    public impugned: number

    @Column({ nullable: false })
    public command: number

    @Column({ nullable: false })
    public appealed: number

    @Column({ nullable: false })
    public challengedIdentity: number

    @Column({ nullable: false })
    public nullVotes: number

    @Column({ nullable: false })
    public voters: number

    @Column({ nullable: false })
    public voted: number

    // DATOS DE LA MESA

    // identificador_unico_mesa (GOB)
    @Index()
    @Column({ nullable: false })
    public uid: string

    // id_colegio
    @Index()
    @Column({ nullable: false })
    public establishmentId: string

    // seccion_id
    @Index()
    @Column({ nullable: false })
    public sectionId: string

    // seccionprovincial_id
    @Index()
    @Column({ nullable: false })
    public subsectionId: string

    // circuito_id
    @Index()
    @Column({ nullable: false })
    public circuitId: string

    // distrido_id
    @Index()
    @Column({ nullable: false })
    public districtId: string
}
