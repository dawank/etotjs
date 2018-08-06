﻿const LineAPI = require('./api');
const { Message, OpType, Location } = require('../curve-thrift/line_types');
let exec = require('child_process').exec;


var myStaff = ['ua33a5b61b096902826ad88ceec5cab56'];

const myAdmin = ['ubbf5fbe22865fcd64a4c4937d5b547c6'];

const myBot = ['u366cb0a9ace5fa9831ce46b715146e26','u53dc7331f6d2c4601ebaf0fdd0b7796d','uaa4b06fcdf0d1e76c88306ce2fd9d19b','u001c51ca5ed2a204fbc7c08691d8b4bb','ubd071cb84f1253e0134f08f734ccbafd','ufe504f42d34856e4e2d5581b95e0ea64','u61cb9c71659ba91a37b13889a5106c84','u565ae99998a944f023d422582c3a0878','ue907987b3706b3ee2a5c79d34b5604f1','u0febc26f4d61c11b78f443b0d4e42497'];
var banList = [];//Banned list
var vx = {};var midnornama,pesane,kickhim;var waitMsg = "no";//DO NOT CHANGE THIS
var komenTL = "AutoLike by Rakha\nline://ti/p/~khalik02"; //Comment for timeline
var bcText = "Masukan teks untuk broadcast";
var limitposts = '10'; //Output timeline post

function isAdmin(param) {
    return myAdmin.includes(param);
}

function isStaff(param) {
    return myStaff.includes(param);
}

function isBot(param) {
     return myBot.includes(param);
}

function isBanned(banList, param) {
    return banList.includes(param);
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function isTGet(string,param){
	return string.includes(param);
}


class LINE extends LineAPI {
    constructor() {
        super();
        this.receiverID = '';
        this.checkReader = [];
	this.sendBlacklist = 0;
        this.sendStaff = 0;
        this.stateStatus = {
            botoff: 0,
            lockinvite: 0,
            lockupdategroup: 1,
            lockjoin: 0,
            lockcancel: 1,
            bankaimode: 1,
            cancel: 1,
            bc: 0,
            bmsg: 0,
        }
    }

    getOprationType(operations) {
        for (let key in OpType) {
            if(operations.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operations.type} ] ${key} `);
                }
            }
        }
    }


    poll(operation) {
        if(operation.type == 25 || operation.type == 26) {
            const txt = (operation.message.text !== '' && operation.message.text != null ) ? operation.message.text : '' ;
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            if(waitMsg == "yes" && operation.message.from == vx[0] && this.stateStatus.botoff != 1){
				this.textMessage(txt,message,message.text)
			}else if(this.stateStatus.botoff != 1){this.textMessage(txt,message);
			}else if(txt == "Bot:on" && isAdmin(operation.message.from) && this.stateStatus.botoff == 1){
			    this.stateStatus.botoff = 0;
		    }else{console.info("Bot Off");}
        }

        if(operation.type == 13 && this.stateStatus.cancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this.cancelAll(operation.param1);
            }
        }
	    
        if(operation.type == 13 && this.stateStatus.cancel == 0) {
             if(isBanned(operation.param3)) {
             let ban = new Message();
             ban.to = operation.param1;
             this._client.sendMessage(0, ban);
             this._cancel(operation.param1,[operation.param3]);
              }

	}

        if(operation.type == 13 && this.stateStatus.lockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }
	    
	    
        if(operation.type == 13 && this.stateStatus.lockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

	}

		if(operation.type == 11 && this.stateStatus.lockupdategroup == 1){//update group (open qr)
		    let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
  this.textMessage("0103",seq,operation.param2,1);
	          }

          }

          if(operation.type == 11 && this.stateStatus.lockupdategroup == 1){
			let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
    this.textMessage("0104",seq,operation.param2,1);
             }

         }

         if(operation.type == 11 && this.stateStatus.lockupdategroup == 0){
			let seq = new Message();
			seq.to = operation.param1;
             if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
   this.textMessage("0103",seq,operation.param2,1);
            }

           }

           if(operation.type == 11 && this.stateStatus.lockupdategroup == 1) { //ada update
           // op1 = group nya
           // op2 = yang 'nge' update
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
              this._kickMember(operation.param1,[operation.param2]);
             }

           }
	    
        if(operation.type == 11 && this.stateStatus.lockupdategroup == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

	}


          if(operation.type == 15 && this.stateStatus.bmsg == 1) {
             let out = new Message();
             out.to = operation.param1;

             out.text = "bye~"
			     this._client.sendMessage(0, out);
            }

            if(operation.type == 17 && this.stateStatus.bmsg == 1) {

               let kam = new Message();
               kam.to = operation.param1;
               kam.text = "wc"
               this._client.sendMessage(0, kam);
             }

           if(operation.type == 16 && this.stateStatus.bmsg == 1) {
             let itil = new Message();
             itil.to = operation.param1;
             itil.text = "Silahkan Ketik [Help] Untuk Mengetahui Command Bot.\n\n♞♞♞ɆsᵽȺđȺ ŦɇȺm Ƀøŧ ♞♞♞"
             this._client.sendMessage(0, itil);
           }

           if(operation.type == 19 && this.stateStatus.bmsg == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
             let plerrr = new Message();
             plerrr.to = operation.param1;
             plerrr.text = "kicker"
             this._client.sendMessage(0, plerrr);
             }

           }

           if(operation.type == 17 && this.stateStatus.lockjoin == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }
	    
           if(operation.type == 17 && this.stateStatus.lockjoin == 0) {
              if(isBanned(operation.param2)) {
                 this._kickMember(operation.param1,[operation.param2]);
              }
	   }

           if(operation.type == 19 && this.stateStatus.bankaimode == 1) { //ada kick
            // op1 = group nya
            // op2 = yang 'nge' kick
            // op3 = yang 'di' kick
            if(isAdmin(operation.param3))

              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
             else
                {
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }
	    
        if(operation.type == 19 && this.stateStatus.bankaimode == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }


        if(operation.type == 32 && this.stateStatus.lockcancel == 1) { //ada cancel
          // op1 = group nya
          // op2 = yang 'nge' cancel
          // op3 = yang 'di' cancel
            if(isAdmin(operation.param3))
              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
             else
                {
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }
	    

        if(operation.type == 32 && this.stateStatus.lockcancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }


        if(operation.type == 55){ //ada reader

            const idx = this.checkReader.findIndex((v) => {
                if(v.group == operation.param1) {
                    return v
                }
            })
            if(this.checkReader.length < 1 || idx == -1) {
                this.checkReader.push({ group: operation.param1, users: [operation.param2], timeSeen: [operation.param3] });
            } else {
                for (var i = 0; i < this.checkReader.length; i++) {
                    if(this.checkReader[i].group == operation.param1) {
                        if(!this.checkReader[i].users.includes(operation.param2)) {
                            this.checkReader[i].users.push(operation.param2);
                            this.checkReader[i].timeSeen.push(operation.param3);
                        }
                    }
                }
            }
        }

        if(operation.type == 13) { // diinvite
            if(isAdmin(operation.param2)) {
                return this._acceptGroupInvitation(operation.param1);
            } else {
                return this._rejectGroupInvitation(operation.param1);
            }
        }
        this.getOprationType(operation);
    }

    async cancelAll(gid) {
        let { listPendingInvite } = await this.searchGroup(gid);
        if(listPendingInvite.length > 0){
            this._cancel(gid,listPendingInvite);
        }
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroups([gid]);
        if(thisgroup[0].invitee !== null) {
            listPendingInvite = thisgroup[0].invitee.map((key) => {
                return key.mid;
            });
        }
        let listMember = thisgroup[0].members.map((key) => {
            return { mid: key.mid, dn: key.displayName };
        });

        return { 
            listMember,
            listPendingInvite
        }
    }

    setState(seq,param) {
		if(param == 1){
			let isinya = "●▬▬▬〆Status bot〆▬▬▬●\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += "√ "+firstToUpperCase(k)+" → on\n";
					}else{
						isinya += "メ "+firstToUpperCase(k)+" → off\n";
					}
                }
            }this._sendMessage(seq,isinya);
		}else{
        if(isAdmin(seq.from) || isStaff(seq.from)){
            let [ actions , status ] = seq.text.split(' ');
            const action = actions.toLowerCase();
            const state = status.toLowerCase() == 'on' ? 1 : 0;
            this.stateStatus[action] = state;
			let isinya = "●▬▬▬〆Info Setting〆▬▬▬●\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += "√ "+firstToUpperCase(k)+" → on\n";
					}else{
						isinya += "メ"+firstToUpperCase(k)+" → off\n";
					}
                }
            }
            //this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}`);
			this._sendMessage(seq,isinya);
        } else {
            this._sendMessage(seq,`Mohon Maaf Anda Bukan Staff Atau Admin~`);
        }}
    }

    mention(listMember) {
        let mentionStrings = [''];
        let mid = [''];
        for (var i = 0; i < listMember.length; i++) {
            mentionStrings.push('@'+listMember[i].displayName+'\n');
            mid.push(listMember[i].mid);
        }
        let strings = mentionStrings.join('');
        let member = strings.split('@').slice(1);
        
        let tmp = 0;
        let memberStart = [];
        let mentionMember = member.map((v,k) => {
            let z = tmp += v.length + 1;
            let end = z - 1;
            memberStart.push(end);
            let mentionz = `{"S":"${(isNaN(memberStart[k - 1] + 1) ? 0 : memberStart[k - 1] + 1 ) }","E":"${end}","M":"${mid[k + 1]}"}`;
            return mentionz;
        })
        return {
            names: mentionStrings.slice(1),
            cmddata: { MENTION: `{"MENTIONEES":[${mentionMember}]}` }
        }
    }

    async leftGroupByName(payload) {
        let gid = await this._findGroupByName(payload);
        for (var i = 0; i < gid.length; i++) {
            this._leaveGroup(gid[i]);
        }
    }
    
    async recheck(cs,group) {
        let users;
        for (var i = 0; i < cs.length; i++) {
            if(cs[i].group == group) {
                users = cs[i].users;
            }
        }
        
        let contactMember = await this._getContacts(users);
        return contactMember.map((z) => {
                return { displayName: z.displayName, mid: z.mid };
            });
    }

	async leftGroupByName(payload) {
        let groupID = await this._getGroupsJoined();
	    for(var i = 0; i < groupID.length; i++){
		    let groups = await this._getGroups(groupID);
            for(var ix = 0; ix < groups.length; ix++){
                if(groups[ix].name == payload){
                    this._client.leaveGroup(0,groups[ix].id);
				    break;
                }
            }
	    }
    }

    removeReaderByGroup(groupID) {
        const groupIndex = this.checkReader.findIndex(v => {
            if(v.group == groupID) {
                return v
            }
        })

        if(groupIndex != -1) {
            this.checkReader.splice(groupIndex,1);
        }
    }

    async textMessage(textMessages, seq, param, lockt) {
        let [ cmd, ...payload ] = textMessages.split(' ');
        payload = payload.join(' ');
        let txt = textMessages.toLowerCase();
        let messageID = seq.id;

        const ginfo =  await this._getGroup(seq.to);
        const groupCreator = ('[ginfo.creator.mid]');
        const cot = textMessages.split('@');
        const com = textMessages.split(':');
        const cox = textMessages.split(' ');


        if(cmd == 'cancel') {
            if(payload == 'group') {
                let groupid = await this._getGroupsInvited();

                for (let i = 0; i < groupid.length; i++) {
                    this._rejectGroupInvitation(groupid[i])                    
                }
                return;
            }
            if(this.stateStatus.cancel == 1) {
                this.cancelAll(seq.to);
            }
        }

		if(vx[1] == "addcontact" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"# CANCELLED");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Sudah masuk dalam daftar pertemanan";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Sukses ditambahkan.";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;let midnya = pment;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Sudah masuk dalam daftar pertemanan";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Sukses ditambahkan.";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(vx[2] == "arg1" && panjang.length > 30 && panjang[0] == "u"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = txt;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Sudah masuk dalam daftar pertemanan";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Sukses ditambahkan.";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else{
				let bang = new Message();
				bang.to = seq.to;
				bang.text = "# How to AddContact\n-Kirim Contact Orang Yang Mau Di Add\n-Kirim Mid Orang Yang Mau Di Add\n-Atau Tag Orang Yang Mau Di Add\n\n# Note :\nDisarankan Untuk Add Contact Khusus Staff Dan Dilarang Untuk Sembarangan Menggunakan Command Ini !";
				this._client.sendMessage(0,bang);
			}
		}

		if(txt == "addcontact" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Send contact or tag target!");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

      if(txt == 'addcontact') {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
this._sendMessage(seq,"Kamu bukan admin");
            }

      }

      if(vx[1] == "cekid" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"# CANCELLED");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let bang = new Message();
				bang.to = seq.to;
				bang.text = midnya;
				this._client.sendMessage(0, bang);
			}else if(txt == "me"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				seq.text = seq.from.toString();
				this._client.sendMessage(0, seq);
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let cekid = new Message();
				cekid.to = seq.to;
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				
				cekid.text = JSON.stringify(pment).replace(/"/g , "");
				this._client.sendMessage(0, cekid);
			}else{
				this._sendMessage(seq,"# How to CekId\nTag orangnya / send contact !");
			}
		}

		if(txt == "cekid" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Send contact or tag target");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

		if(txt == "cekid" && isStaff(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Send contact or tag target");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

		if(vx[1] == "msg1" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(vx[2] == "arg1" && vx[3] == "mid" && cot[1]){
				let bang = new Message();bang.to = seq.to;
				bang.text = "apa pesannya?"
				this._client.sendMessage(0,bang);
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let midnya = JSON.stringify(pment);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				bang.text = "apa pesannya?"
				this._client.sendMessage(0,bang);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && panjang.length > 30){
				this._sendMessage(seq,"apa pesannya?");
				vx[4] = txt;
				vx[2] = "arg2";
			}else if(vx[2] == "arg2" && vx[3] == "mid"){
				let panjangs = vx[4].split("");
				let kirim = new Message();let bang = new Message();
				bang.to = seq.to;
				if(panjangs[0] == "u"){
					kirim.toType = 0;
				}else if(panjangs[0] == "c"){
					kirim.toType = 2;
				}else if(panjangs[0] == "r"){
					kirim.toType = 1;
				}else{
					kirim.toType = 0;
				}
				bang.text = "Pesan terkirim !";
				kirim.to = vx[4];
				kirim.text = txt;
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";vx[4] = "";
				this._client.sendMessage(0, kirim);
				this._client.sendMessage(0, bang);
			}else{
				this._sendMessage(seq,"# How to Msg\nKirim Kontak orang yang mau dikirimkan pesan !");
			}
		}

      if(txt == "msg1" && isStaff(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"send contact or tag");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}


      if(txt == "msg1" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Send contact or tag");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "msg"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin atau staff!");
             }

      }
	    
      if(txt == 'ban' && this.sendBlacklist == 0 && isAdmin(seq.from)){
         this.sendBlacklist = 1;
         this._sendMessage(seq,'Send contact untuk dibanned')
       }

       if(seq.contentType == 13 && this.sendBlacklist == 1 && isAdmin(seq.from)) {
          seq.contentType = 0;
          this.sendBlacklist = 0;
          banList.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'Berhasil ditambahkan ke banlist');
        }

       if(txt == "ban"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

        if(txt == 'unban' && this.sendBlacklist == 0 && isAdmin(seq.from))
{
           this.sendBlacklist = 2;
           this._sendMessage(seq,'Kirim kontak untuk di unban')
           }

           if(seq.contentType == 13 && this.sendBlacklist == 2 && isAdmin(seq.from))
{
              if(!isBanned(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendBlacklist = 0;
                 await this._sendMessage(seq,'Target belum masuk di banlist');
       }
     else
       {
            seq.contentType = 0;
            while (banList[banList.indexOf(seq.contentMetadata.mid)])
        {
            delete banList[banList.indexOf(seq.contentMetadata.mid)];
        }
    this.sendBlacklist = 0;
    await this._sendMessage(seq,'Berhasil dihapus dari banlist');
    }
}

       if(txt == "unban"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }



		if(txt == "banlist"){
			seq.text = "●▬▬ Daftar Banned ▬▬●\n";
			for(var i = 0; i < banList.length; i++){
			    let orangnya = await this._getContacts([banList[i]]);
            seq.text += "\n☞ "+orangnya[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}


		if(cox[0] == "BcGroup" && isAdmin(seq.from) && cox[1]){
            let listMID = [];
            let bcText = textMessages.split(" ").slice(1).toString().replace(/,/g , " ");
            let bcm = new Message();
            bcm.toType = 0;
	        let listGroups = await this._client.getGroupIdsJoined();listMID.push(listGroups);
			for(var i = 0; i < listMID.length; i++){
		        for(var xi = 0; xi <listMID[i].length; xi++){
		        	bcm.to = listMID[i][xi];
                    let midc = listMID[i][xi].split("");
                    if(midc[0] == "u"){bcm.toType = 0;}else if(midc[0] == "c"){bcm.toType = 2;}else if(midc[0] == "r"){bcm.toType = 1;}else{bcm.toType = 0;}
                    bcm.text = bcText;
                    this._client.sendMessage(0, bcm);
	        	}
            }
        }else if(cox[0] == "BcGroup" && isAdmin(seq.from) &&!cox[1]){this._sendMessage(seq,"# How to broadcast:\nbroadcast yourtexthere");
        }

        if(cox[0] == "BcGroup") {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
              this._sendMessage(seq,"Kamu bukan admin");
             }

      }

		if(txt == '0103' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){}else{ax.preventJoinByTicket = true;await this._client.updateGroup(0, ax);}
		}
		if(txt == '0104' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){ax.preventJoinByTicket = false;await this._client.updateGroup(0, ax);}else{}
		}

      if(txt == 'add:staff' && this.sendStaff == 0 && isAdmin(seq.from)){
         this.sendStaff = 1;
         this._sendMessage(seq,'Send contact!')
       }

       if(seq.contentType == 13 && this.sendStaff == 1 && isAdmin(seq.from)) {
          seq.contentType = 0;
          this.sendStaff = 0;
          myStaff.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'Sukses ditambahkan :'+'\n'+seq.contentMetadata.displayName);
        }

       if(txt == "add:staff"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin!");
             }

      }

        if(txt == 'del:staff' && this.sendStaff == 0 && isAdmin(seq.from))
{
           this.sendStaff = 2;
           this._sendMessage(seq,'Send contact!')
           }

           if(seq.contentType == 13 && this.sendStaff == 2 && isAdmin(seq.from))
{
              if(!isStaff(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendStaff = 0;
                 await this._sendMessage(seq,'Dia Bukan Staff!');
       }
     else
       {
            seq.contentType = 0;
            while (myStaff[myStaff.indexOf(seq.contentMetadata.mid)])
        {
            delete myStaff[myStaff.indexOf(seq.contentMetadata.mid)];
        }
    this.sendStaff = 0;
    await this._sendMessage(seq,'Sukses dihapuskan dari stafflist!');
    }
}

       if(txt == "del:staff"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin atau staff!");
             }

      }
	    
	    

		if(txt == "adminlist"){
			seq.text = "●▬▬▬ Daftar Admin ▬▬▬●\n";
			for(var i = 0; i < myAdmin.length; i++){
			    let admin = await this._getContacts([myAdmin[i]]);
            seq.text += "\n☞ "+admin[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}
	    
		if(txt == "stafflist"){
			seq.text = "●▬▬▬ Daftar staff ▬▬▬●\n";
			for(var i = 0; i < myStaff.length; i++){
			    let staff = await this._getContacts([myStaff[i]]);
            seq.text += "\n☞ "+staff[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

        if(txt == 'infogroup') {
           this._sendMessage(seq, 'Nama Group :\n'+ginfo.name+'\n\nGroup ID :\n'+ginfo.id+'\n\nPembuat Group :\n'+ginfo.creator.displayName);
         }

        if(txt == 'berkumpul') {
           if(isAdmin(seq.from) || isStaff(seq.from)) {
            this._sendMessage(seq, 'Im here');
           }
        }

       if(txt == "berkumpul"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin atau staff!");
             }

      }

        if(txt == 'help1') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {
              this._sendMessage(seq, '●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n ♞♞♞ɆsᵽȺđȺ ŦɇȺm♞♞♞\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n♞ Myid\n♞ Gift1\n♞ Halo\n♞ Help1\n♞ CreatorBot\n♞ Say [Jumlah] /[Text]\n♞ InfoGroup\n♞ GroupCreator\n♞ Tag1\n♞ Speed\n♞ setpoint1\n♞ check1\n♞ Status/Setting\n♞  reset read\n♞ Berkumpul\n♞ Opengarganta[Membuka gerbang dimensi\n♞ Closegarganta[Menutup gerbang dimensi]\n♞ hueco mundo[Kembali ke Markas]\n♞ spam\n♞ Bankaimode On/Off\n♞ Cancel On/Off\n♞ LockInvite On/Off\n♞ LockUpdateGroup On/Off\n♞ LockJoin On/Off\n♞ LockCancel On/Off\n♞ Cero「@」[menghancurkan target dengan cero]\n♞ Kickall (bankaimode On Terlebih Dahulu)\n♞ Msg1\n♞ Bc On/Off\n♞ Bmsg On/Off\n\●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\nAdmin command\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n♞ Glist\n♞ Adminlist\n♞ Ban\n♞ Unban\n♞ Botoff\n♞ Bot:on\n♞ add:staff\n♞ del:staff\n♞ BcGroup [Text]\n♞ AddContact\n♞ CreateGroup [Jumlah]-[Nama]/[Mid]\n\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n♞♞♞ɆsᵽȺđȺ ŦɇȺm Ƀøŧ ♞♞♞\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●');
	   }
	}
	    
	    
	    
         if(txt == "glist" || txt == "glist") {
            seq.text = "●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n Group List \n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n\n";
         let gid = await this._getGroupsJoined();
           for(var i = 0; i < gid.length; i++){
			     let group = await this._getGroups([gid[i]]);
			       seq.text += "◙ "+group[0].name+" | "+group[0].members.length+" Members♪\n";
          }
	             seq.text += "\nTotal : "+gid.length+" Groups Joined♪";
                seq.text += "\n\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\nɆsᵽȺđȺ ŦɇȺm\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●"
			       this._sendMessage(seq,seq.text);
	      }

	    
	    

         if(txt == 'status') {
	    if(isAdmin(seq.from) || isStaff(seq.from)) {
               this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}\n\n-ɆsᵽȺđȺ ŦɇȺm-`);
          
	    }
	 }
		if(txt == "setting"){
		   if(isAdmin(seq.from) || isStaff(seq.from)) {
			this.setState(seq,1)
		   }
		}

        if(txt == 'Ampas') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {

           	seq.contentType = 7
           	seq.contentMetadata = {'STKID':'404','STKPKGID':'1','STKVER':'100'};
           	this._client.sendMessage(3, seq);
	   }
	}

          if(txt == 'gift1') {
	     if(isAdmin(seq.from) || isStaff(seq.from)) {
             	seq.contentType = 9
             	seq.contentMetadata = {'PRDID': 'a0768339-c2d3-4189-9653-2909e9bb6f58','PRDTYPE': 'THEME','MSGTPL': '5'};
             	this._client.sendMessage(1, seq);
	     }
          }

        if(txt == 'Hai') {
          if(isAdmin(seq.from) || isStaff(seq.from)) {
        	this._sendMessage(seq, 'Hai juga');
	  }
      	  else
	  {
         	this._sendMessage(seq, 'ga ah lu bau, TQ!');
	  }
	}



        if(txt == 'speed') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {
            	const curTime = (Date.now() / 1000);
            	await this._sendMessage(seq,'Please wait....');
            	const rtime = (Date.now() / 1000) - curTime;
            	await this._sendMessage(seq, `${rtime} second`);
	   }
        }

        if(txt == 'tag1' && isAdmin(seq.from)) {
let { listMember } = await this.searchGroup(seq.to);
     const mentions = await this.mention(listMember);
        seq.contentMetadata = mentions.cmddata; await this._sendMessage(seq,mentions.names.join(''))
        }

        //if(txt === 'kernelo') {
          //exec('uname -a;ptime;id;whoami',(err, sto) => {
                //this._sendMessage(seq, sto);
            //})
        //}


        if(txt === 'kickall' && this.stateStatus.bankaimode == 1 && isAdmin(seq.from)) {
            let { listMember } = await this.searchGroup(seq.to);
            for (var i = 0; i < listMember.length; i++) {
                if(!isAdmin(listMember[i].mid)){
                    this._kickMember(seq.to,[listMember[i].mid])
                }
            }
        }

       if(txt == "kickall"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin");
             }

      }

        if(txt == 'setpoint1') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {
            	this._sendMessage(seq, `Check point sudah di set!`);
            	this.removeReaderByGroup(seq.to);
	   }
        }

        if(txt == 'reset read1') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {

            	this.checkReader = []
            	this._sendMessage(seq, `Check point sudah di reset`);
	   }
        }  


        if(txt == 'check1'){
	   if(isAdmin(seq.from) || isStaff(seq.from)) {

            	let rec = await this.recheck(this.checkReader,seq.to);
            	const mentions = await this.mention(rec);
            	seq.contentMetadata = mentions.cmddata;
            	await this._sendMessage(seq,mentions.names.join(''));
	   }
            
        }

         if (txt == 'gcreator') {
             let gcreator = await this._getGroup(seq.to);
             seq.contentType = 13;
             seq.contentMetadata = {mid: gcreator.creator.mid, displayName: gcreator.creator.displayName};
             this._client.sendMessage(1, seq);
         }

        if(txt == 'creator') {
	   if(isAdmin(seq.from) || isStaff(seq.from)) {
           	seq.contentType=13;
           	seq.contentMetadata = { mid: 'ufdb348d53532a57228f045ecfaa00f8d' };
           	this._client.sendMessage(1, seq);
	   }
        }

        //if(seq.contentType == 13) {
            //seq.contentType = 0
            //this._sendMessage(seq,seq.contentMetadata.mid);
        //}


        if(txt == 'setpoint for check reader .') {
	    if(isAdmin(seq.from) || isStaff(seq.from)) {	
            	this.searchReader(seq);
	    }
        }

        if(txt == 'clearall') {
		if(isAdmin(seq.from) || isStaff(seq.from)) {
            		this.checkReader = [];
		}
        }

		if(txt == "botoff" && isAdmin(seq.from)) {
			this.stateStatus.botoff = 1;
			this._sendMessage(seq,"Bot change to mode off.")
		}

       if(txt == "botoff" || txt == "Bot:on"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin atau staff!");
             }

      }

       if(txt == "opengarganta" || txt == "closegarganta" || txt == "spam" || txt == "bye"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"Kamu bukan admin atau staff!");
             }

      }

        const action = ['lockinvite on','lockinvite off','lockupdategroup on','lockupdategroup off','lockjoin on','lockjoin off','lockcancel on','lockcancel off','bankaimode on','bankaimode off','cancel on','cancel off','bc on','bc off','bmsg on','bmsg off']
        if(action.includes(txt)) {
            this.setState(seq)
        }
	if(txt == 'Bankai' && isAdmin(seq.from)) {
		this.sendMessage(seq,"Bankai mode sudah aktif");
		
	}
		
	    
	    
        if(txt === 'kernel' && isAdmin(seq.from)) {
          exec('uname -a;ptime;id;whoami',(err, sto) => {
                this._sendMessage(seq, sto);
            })
        }

	    
        if(txt === 'kernel' && isStaff(seq.from)) {
          exec('uname -a;ptime;id;whoami',(err, sto) => {
                this._sendMessage(seq, sto);
            })
        }
		
	
        if(txt == 'myid' && isAdmin(seq.from)) {
            this._sendMessage(seq,`MID Anda : ${seq.from}`);
        }

        const joinByUrl = ['opengarganta','closegarganta'];
      if(joinByUrl.includes(txt) && isAdmin(seq.from)) {
            this._sendMessage(seq,`Please wait ...`);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'opengarganta') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`Link Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }
	    
        if(cmd == 'join' && isAdmin(seq.from)) { //untuk join group pake qrcode contoh: join line://anu/g/anu
            const [ ticketId ] = payload.split('g/').splice(-1);
            let { id } = await this._findGroupByTicket(ticketId);
            await this._acceptGroupInvitationByTicket(id,ticketId);
        }
	    
	    

           if(cmd == 'GroupName' && isAdmin(seq.from)) {
                    let group = await this._getGroup(seq.to);
                    group.name = payload.replace('@','');
                    let change = await this._updateGroup(group);
                    this._sendMessage(seq, "Berhasil mengganti nama group : "+group.name+"");
	   }


       
        if(cmd == 'cero' && isAdmin(seq.from)){
           let target = payload.replace('@','');
           let group = await this._getGroups([seq.to]);
           let gm = group[0].members;
              for(var i = 0; i < gm.length; i++){
                     if(gm[i].displayName == target){
                                  target = gm[i].mid;
                     }
               }

               this._kickMember(seq.to,[target]);
        }

               if(cmd == 'Say' || cmd == 'Bc' && this.stateStatus.bc == 1) {
			if(isAdmin(seq.from) || isStaff(seq.from)) {
                  		const [  j, kata ] = payload.split('/');
                  		for (var i=0; i <j; i++) {
                  		this._sendMessage(seq,`${kata}`);
				}
			}
	       }

        if(cmd == 'spam' && isAdmin(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'Bacod lu njing!!!');
        }
    }

//Tab:CreateGroup <jumlah>-<NamaGrup>/<mid>
//Tab:CreateGroup 100-NamaGrupnya/midkorban
        if(cmd == 'CreateGroup' && isAdmin(seq.from)) { 
            const [ j, u ] = payload.split('-');
            const [ n, m ] = u.split('/');
            for (var i = 0; i < j; i++) {
                this._createGroup(`${n}`,[m]);
            }
        }
	    
        
        if(txt == 'hueco mundo') {
           if(isAdmin(seq.from) || isStaff(seq.from)){
          	let txt = await this._sendMessage(seq, 'Bye bye, Dont cry i will be back');
          	this._leaveGroup(seq.to);
	   }
	}

        if(cmd == 'lirik' && isAdmin(seq.from)) {
            let lyrics = await this._searchLyrics(payload);
            this._sendMessage(seq,lyrics);
        }

        //if(cmd === 'ip') {
            //exec(`curl ipinfo.io/${payload}`,(err, res) => {
                //const result = JSON.parse(res);
                //if(typeof result.error == 'undefined') {
                    //const { org, country, loc, city, region } = result;
                    //try {
                        //const [latitude, longitude ] = loc.split(',');
                        //let location = new Location();
                        //Object.assign(location,{ 
                            //title: `Location:`,
                            //address: `${org} ${city} [ ${region} ]\n${payload}`,
                            //latitude: latitude,
                            //longitude: longitude,
                            //phone: null 
                        //})
                        //const Obj = { 
                            //text: 'Location',
                            //location : location,
                            //contentType: 0,
                        //}
                        //Object.assign(seq,Obj)
                        //this._sendMessage(seq,'Location');
                    //} catch (err) {
                        //this._sendMessage(seq,'Not Found');
                    //}
                //} else {
                    //this._sendMessage(seq,'Location Not Found , Maybe di dalem goa');
                //}
            //})
        //}
    }

}

module.exports = new LINE();
