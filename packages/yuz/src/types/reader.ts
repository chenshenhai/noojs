import { EventEmitter } from 'events';

export type TypeReadItem = {
  name: string;
  path: string;
  absolutePath: string;
  createTime?: number;
  lastModify?: number;
}

export type TypeReadDocType = 'gitbook' | 'vuepress';

export type TypeReadList = TypeReadItem[];

export type TypeReaderOptions = {
  baseDir: string;
}

export interface TypeReader extends EventEmitter {
  readList(baseDir: string, opts: { type: TypeReadDocType }): Promise<TypeReadList>
}