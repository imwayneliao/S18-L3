class BaseCharacter {
  constructor(name, hp, ap) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;
  }
  attack(character, damage) {
    if (this.alive == false) {
      return;
    }
    character.getHurt(damage);
  } 
  getHurt(damage) { 
    this.hp -= damage;
    if (this.hp <= 0) { 
      this.die();
    }
  }
  die() {
    this.alive = false;
  }
  updateHtml(hpElement, hurtElement) {
    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%";
  }
}
class Hero extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);
    //加入英雄對應標籤
    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");
    //修改英雄的血量
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;
    //印出英雄文字
    console.log("召喚英雄 " + this.name + "！");
  }
  attack(character) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}
class Monster extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);
    //加入怪獸對應標籤
    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");
    //修改怪獸的血量
    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;
    //印出怪獸文字
    console.log("遇到怪獸 " + this.name + "了！");
  }
  attack(character) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}
var hero = new Hero("Bernard", 130, 30);
var monster = new Monster("Skeleton", 130, 10);