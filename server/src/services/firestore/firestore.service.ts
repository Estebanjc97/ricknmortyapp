import { Firestore, WriteResult } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirestoreFilter } from './firestore.entity';

@Injectable()
export class FirestoreService {
  private firestore: Firestore;

  constructor(private configService: ConfigService) {
    this.firestore = new Firestore(
      this.configService.get<FirebaseFirestore.Settings>('firestore'),
    );
  }

  getFirestore(): Firestore {
    return this.firestore;
  }

  async addDocument(
    collection: string,
    id: string,
    data: any,
  ): Promise<string> {
    const docRef = this.firestore.collection(collection).doc(id);
    await docRef.set(data);
    return docRef.id;
  }

  async getDocument(collection: string, id: string): Promise<any> {
    const doc = await this.firestore.collection(collection).doc(id).get();
    return doc.exists ? { id, ...doc.data() } : null;
  }

  async getAllDocuments(
    collection: string,
    limit: number = 0,
    filters: FirestoreFilter[] = [],
    orderByField: string = '',
    orderByDirection: 'asc' | 'desc' = 'asc',
  ): Promise<any[]> {
    let query: any = this.firestore.collection(collection);

    for (const filter of filters) {
      query = query.where(filter.field, filter.operator, filter.value);
    }

    if (orderByField) {
      query = query.orderBy(orderByField, orderByDirection);
    }

    if (limit > 0) {
      query = query.limit(limit);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return [];
    }

    const documents = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documents;
  }

  async updateDocument(
    collection: string,
    id: string,
    data: any,
  ): Promise<WriteResult> {
    try {
      return await this.firestore.collection(collection).doc(id).update(data);
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async deleteDocument(collection: string, id: string): Promise<void> {
    try {
      const docRef = this.firestore.collection(collection).doc(id);
      await docRef.delete();
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }
}
