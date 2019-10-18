// User class
export class User {
  public groupId: string;
  public userId: string;
  public name: string;
  public discordId: string;
  public ownerGroupId: string;

  constructor(userId: string, name: string, discordId: string, groupId: string, ownerGroupId : string) {
    this.name = name;
    this.discordId = discordId;
    this.groupId = groupId;
    this.userId = userId;
    this.ownerGroupId = ownerGroupId; 
  }
}
