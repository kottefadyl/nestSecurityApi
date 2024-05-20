// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Profil {
  ONE = '1',
  TWO = '2',
  THREE = '3',
}

export enum Status {
  MINUS_ONE = '-1',
  ZERO = '0',
  ONE = '1',
}

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ name: 'ID_USER' })
  id: number;

  @Column({ name: 'MAT_MEMB', length: 225, nullable: true, unique:true })
  matMemb: string;

  @Column({ name: 'NOM_USER', length: 50, nullable: false })
  nomUser: string;

  @Column({ name: 'PRENOM_USER', length: 50, nullable: true })
  prenomUser: string;

  @Column({ name: 'TEL_USER', nullable: true })
  telUser: number;

  @Column({ name: 'EMAIL_USER', length: 50, nullable: false, unique : true })
  emailUser: string;

  @Column({ name: 'PASS_WORD', length: 225, nullable: false })
  password: string;

  @Column({ name: 'PROFIL_USER', length: 1, nullable: true })
  profilUser: string; // Utilisation de string pour les colonnes ENUM

  @Column({ name: 'STATUS_USER', length: 1, nullable: true })
  statusUser: string; // Utilisation de string pour les colonnes ENUM

  @Column({ name: 'CREATE_USER_AT', nullable: true })
  createUserAt: number;

  @Column({ name: 'UPDATE_USER_AT', nullable: true })
  updateUserAt: number;

  @Column({ name: 'DATE_CREATE_AT', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreateAt: Date;

  @Column({ name: 'DATE_UPDATE_AT', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdateAt: Date;
}