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
    var _this = this;
    var i = 1;
    _this.id = setInterval(function() {
      if (i == 1) {
          _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
          _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
          _this.element.getElementsByClassName("hurt-text")[0].textContent = damage;
        }      
        _this.element.getElementsByClassName("effect-image")[0].src = 'images/effect/blade/'+ i +'.png';
        i++;
      if (i > 8) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].textContent = "";
        clearInterval(_this.id);
      }
    }, 50);
  }
  heal(healHp) {
    this.hp += healHp;
    var _this = this;
    var i = 1;
    _this.id = setInterval(function() {
      if (i == 1) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
        _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].textContent = healHp;
        _this.element.getElementsByClassName("hurt-text")[0].style.color = "green";
        }      
        _this.element.getElementsByClassName("effect-image")[0].src = 'images/effect/heal/'+ i +'.png';
        i++;
      if (i > 8) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].textContent = "";
        _this.element.getElementsByClassName("hurt-text")[0].style.color = "red";
        clearInterval(_this.id);
      }
    }, 50); 
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
  heal(healHp) {
    super.heal(healHp);
    this.updateHtml(this.hpElement, this.hurtElement);
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
var monster = new Monster("Skeleton", 130, 40);

var rounds = 10;
function endTurn() {
  rounds--;
  document.getElementById("round-num").textContent = rounds;
  if (rounds < 1) {
    finish();
  }
}
function heroAttack() {
  document.getElementsByClassName("skill-block")[0].style.display = "none";
  setTimeout(function() {
    hero.element.classList.add("attacking");
    console.log("開打");
    setTimeout(function() {
      hero.attack(monster);
      hero.element.classList.remove("attacking");
    }, 500);
  }, 100);
  setTimeout(function() {
    if (monster.alive) {
      monsterAttack();
      setTimeout(function(){
        endTurn();
        document.getElementsByClassName("skill-block")[0].style.display = "block";
      }, 1000);
    } else {
      finish();
    }
  }, 1100);

}
function finish() {
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.alive == false) {
    dialog.classList.add("win");
  } else {
    dialog.classList.add("lose");
  }
}
function heroHeal() {
  document.getElementsByClassName("skill-block")[0].style.display = "none";
  var healHp = Math.min(30, hero.maxHp-hero.hp);
  hero.heal(healHp);
  setTimeout(function(){
    monsterAttack();
    setTimeout(function(){
      endTurn();
      document.getElementsByClassName("skill-block")[0].style.display = "block";
    }, 1000);
  }, 500);
}
function monsterAttack(){
  monster.element.classList.add("attacking");
  setTimeout(function() {
    monster.attack(hero);
    monster.element.classList.remove("attacking");
    if (hero.alive == false) {
      finish();
    } 
  }, 500);
}
function addSkillEvent() {
  var skill = document.getElementById("skill");
  skill.onclick = function() { 
    heroAttack(); 
  }
  var heal = document.getElementById("heal");
  heal.onclick = function() { 
    heroHeal(); 
  }
}
addSkillEvent();