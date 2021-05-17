/**
 * add this to MainActivity file for Android
 * import com.jeep.plugin.capacitor.CapacitorDataStorageSqlite;

 ...

 public class MainActivity extends BridgeActivity {
   @Override
   public void onCreate(Bundle savedInstanceState) {
     super.onCreate(savedngInstanceState);

     // Initializes the Bridge
     this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
       // Additional plugins you've installed go here
       // Ex: add(TotallyAwesomePlugin.class);
       add(CapacitorDataStorageSqlite.class);
     }});
   }
 }
 */

import { Plugins } from '@capacitor/core';
import * as CapacitorSQLPlugin from 'capacitor-data-storage-sqlite';
import { Injectable } from '@angular/core';
const { CapacitorDataStorageSqlite, Device } = Plugins;

@Injectable()
export class SqliteStorageService {
    public storage: any = {}
    constructor() { 
      this.init();
    }
    async init(): Promise<void> {
        const info = await Device.getInfo();
        console.log('platform ',info.platform)
        if (info.platform === "ios" || info.platform === "android") {
            this.storage = CapacitorDataStorageSqlite;
        }  else if(info.platform === "electron") {
            this.storage = CapacitorSQLPlugin.CapacitorDataStorageSqliteElectron;
        }else {
            this.storage = CapacitorSQLPlugin.CapacitorDataStorageSqlite;     
        } 
    }
    public async openStore(options:any): Promise<boolean> {
       // await this.init();
        const {result} = await this.storage.openStore(options);
        return result;
    }
    public async setTable(table:any): Promise<any>  {
        const {result,message} = await this.storage.setTable(table);
        return Promise.resolve([result,message]);
    }
    public async setItem(key:string, value:string): Promise<void> {
        await this.storage.set({ key, value });
      return;
    }
    public async getItem(key:string): Promise<string> {
        const {value} = await this.storage.get({ key });
      return value;
    }
    public async getAllKeys(): Promise<Array<string>> {
        const {keys} = await this.storage.keys();
      return keys;
    }
    public async removeItem(key:string): Promise<void> {
        await this.storage.remove({ key });
      return;
    }
    public async clear(): Promise<void> {
        await this.storage.clear();
      return;
    }
    public async deleteStore(options:any): Promise<boolean> {
        await this.init();
        const {result} = await this.storage.deleteStore(options);
        return result;
    }
}

async function  testPluginWithWrapper() {
    this.storage = new SqliteStorageService();
    let ret1: boolean = false;
    let ret2: boolean = false;
    let ret3: boolean = false;
    let ret4: boolean = false;
    let ret5: boolean = false;
    let ret6: boolean = false;
    let result: boolean = await this.storage.openStore({});
    if(result){
      await this.storage.clear();
      await this.storage.setItem("key-test", "This is a test");
      let value:string = await this.storage.getItem("key-test")
      if (value === "This is a test") ret1 = true;
      let keys:Array<string> = await this.storage.getAllKeys();
      if (keys[0] === "key-test") ret2 = true;     
      await this.storage.removeItem("key-test");
      keys = await this.storage.getAllKeys();
      if (keys.length === 0) ret3 = true;           
      result = await this.storage.openStore({database:"testStore",table:"table1"});
      if(result) {
        await this.storage.clear();
        await this.storage.setItem("key1-test", "This is a new store");
        value = await this.storage.getItem("key1-test")
        if (value === "This is a new store") ret4 = true;
        let statusTable: any = await this.storage.setTable({table:"table2"});if(statusTable[0]) ret5 = true;
        await this.storage.clear();
        await this.storage.setItem("key2-test", "This is a second table");
        value = await this.storage.getItem("key2-test")
        if (value === "This is a second table") ret6 = true;
      }
    }
    if(ret1 && ret2 && ret3 && ret4 && ret5 && ret6) {
      console.log('testPlugin2 is successful');
    }
  }