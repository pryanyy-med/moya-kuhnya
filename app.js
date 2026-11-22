'use strict';
const CATEGORIES = ['Завтраки','Мясо и птица','Рыба и морепродукты','Гарниры','Готовые блюда','Овощи и добавки','Фрукты и ягоды','Десерты','Перекусы'];
const SLOTS = ['Завтрак','Обед','Ужин','Перекус'];
const DAYS = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
const unitOptions = ['г','кг','мл','л','шт.','ст. л.','ч. л.'];
// Демо-рецепты: нутриенты приблизительны на одну порцию. Количество ингредиентов рассчитано на весь рецепт.
const seeds = [
 ['Каша с мягким творогом и фруктами','Завтраки','🥣',1,430,25,10,60,10,'Овсяные хлопья|50|г;Мягкий творог|150|г;Банан|80|г;Ягоды|70|г','Сварить овсянку на воде. Добавить мягкий творог, нарезанный банан и ягоды.'],
 ['Овсянка «Рафаэлло»','Завтраки','🥥',1,405,22,12,51,10,'Овсяные хлопья|50|г;Молоко|150|мл;Греческий йогурт|120|г;Кокосовая стружка|10|г;Банан|60|г','Сварить хлопья с молоком. Добавить йогурт, кокосовую стружку и банан.'],
 ['Ночная овсянка','Завтраки','🥣',1,390,24,9,50,5,'Овсяные хлопья|50|г;Греческий йогурт|180|г;Молоко|100|мл;Ягоды|100|г','Смешать вечером, накрыть и убрать в холодильник до утра.'],
 ['Омлет с ветчиной индейки','Завтраки','🍳',1,375,31,18,20,12,'Яйца|2|шт.;Ветчина индейки|70|г;Помидоры|120|г;Хлеб|45|г','Нарезать ветчину, залить взбитыми яйцами, готовить под крышкой. Подать с томатами и хлебом.'],
 ['Лаваш с омлетом и ветчиной','Завтраки','🌯',1,440,34,15,39,15,'Лаваш|60|г;Яйца|1|шт.;Яичный белок|100|г;Ветчина индейки|70|г;Помидоры|80|г','Приготовить омлет, завернуть с ветчиной и помидорами в лаваш, подрумянить.'],
 ['Шакшука','Завтраки','🍅',1,385,21,16,39,20,'Яйца|2|шт.;Помидоры|180|г;Болгарский перец|100|г;Хлеб|60|г;Оливковое масло|5|г','Потушить помидоры и перец, сделать углубления и довести яйца до готовности.'],
 ['Сырники в аэрогриле','Завтраки','🧀',2,310,27,9,31,25,'Творог 5%|400|г;Яйца|1|шт.;Рисовая мука|45|г;Ягоды|100|г','Смешать творог, яйцо и муку. Сформировать сырники и запечь в аэрогриле, подать с ягодами.'],
 ['Протеиновые блинчики с бананом','Завтраки','🥞',1,415,29,12,48,20,'Творог 2%|150|г;Яйца|1|шт.;Овсяная мука|45|г;Банан|100|г','Смешать ингредиенты, испечь небольшие блинчики на антипригарной сковороде.'],
 ['Куриные котлеты','Мясо и птица','🍗',4,235,33,9,6,35,'Куриный фарш|650|г;Лук|100|г;Яйца|1|шт.;Панировочные сухари|35|г;Оливковое масло|10|г','Смешать фарш с луком, яйцом и сухарями. Сформировать котлеты, запечь до готовности.'],
 ['Куриная грудка с фасолью','Мясо и птица','🍗',2,345,42,10,20,30,'Куриная грудка|350|г;Зелёная фасоль|350|г;Оливковое масло|15|г;Чеснок|2|зубчика','Обжарить или запечь грудку, добавить фасоль и чеснок, довести до готовности.'],
 ['Курица с овощами в духовке','Мясо и птица','🍲',3,320,36,11,16,45,'Куриная грудка|550|г;Кабачок|300|г;Болгарский перец|250|г;Морковь|150|г;Оливковое масло|20|г','Нарезать, приправить и запекать до полной готовности курицы.'],
 ['Куриные отбивные','Мясо и птица','🍗',3,215,36,6,3,30,'Куриная грудка|550|г;Оливковое масло|15|г;Специи|5|г','Отбить грудку, приправить, запечь или приготовить на сковороде.'],
 ['Грудка индейки','Мясо и птица','🍖',3,225,38,6,2,40,'Филе индейки|600|г;Оливковое масло|15|г;Специи|5|г','Приправить индейку, запечь до полной готовности. Нарезать порционно.'],
 ['Говядина с рисом','Готовые блюда','🍛',3,510,38,16,53,45,'Говядина нежирная|550|г;Рис сухой|210|г;Лук|100|г;Морковь|150|г;Оливковое масло|20|г','Протушить говядину с луком и морковью, подать с отварным рисом.'],
 ['Ленивые голубцы','Готовые блюда','🥬',4,395,34,12,39,55,'Фарш индейки|650|г;Капуста|500|г;Рис сухой|180|г;Лук|120|г;Томатная пассата|250|г;Оливковое масло|15|г','Смешать фарш, нашинкованную капусту, полуготовый рис и лук. Сформировать голубцы и тушить в томатном соусе.'],
 ['Фаршированные перцы','Готовые блюда','🫑',4,400,32,12,40,55,'Болгарский перец|650|г;Фарш индейки|600|г;Рис сухой|180|г;Помидоры|250|г;Лук|120|г','Смешать фарш с полуготовым рисом и луком, нафаршировать перцы, тушить с помидорами.'],
 ['Запеканка из индейки и картофеля','Готовые блюда','🥘',4,470,40,15,43,60,'Филе индейки|700|г;Картофель|800|г;Греческий йогурт|150|г;Сыр|90|г;Лук|100|г','Уложить картофель и индейку слоями, добавить йогурт и сыр, запечь до готовности.'],
 ['Кускус с овощами и курицей','Готовые блюда','🍛',3,490,38,12,57,30,'Куриная грудка|500|г;Кускус сухой|210|г;Замороженные овощи|450|г;Оливковое масло|20|г','Приготовить кускус, курицу и овощи отдельно, затем смешать и приправить.'],
 ['Чечевица с куриной грудкой','Готовые блюда','🥘',3,470,45,9,50,40,'Куриная грудка|480|г;Чечевица сухая|210|г;Морковь|160|г;Лук|100|г;Оливковое масло|15|г','Отварить чечевицу, курицу приготовить с овощами, соединить.'],
 ['Треска с кабачком','Рыба и морепродукты','🐟',2,225,35,6,8,25,'Филе трески|400|г;Кабачок|400|г;Оливковое масло|10|г;Лимон|1|шт.','Запечь рыбу и кабачок с лимоном до готовности.'],
 ['Лосось с бурым рисом','Рыба и морепродукты','🐟',2,570,39,26,45,30,'Филе лосося|300|г;Рис бурый сухой|140|г;Руккола|80|г;Лимон|1|шт.','Запечь лосось, отварить рис и подать с рукколой и лимоном.'],
 ['Паста с кальмаром','Готовые блюда','🍝',2,460,37,9,57,25,'Макароны сухие|150|г;Кальмар|360|г;Помидоры|240|г;Греческий йогурт|100|г;Оливковое масло|10|г','Отварить пасту. Быстро приготовить кальмара, соединить с томатами и соусом.'],
 ['Рис отварной','Гарниры','🍚',2,245,5,1,53,20,'Рис сухой|140|г;Соль|2|г','Промыть рис и отварить до готовности.'],
 ['Гречка отварная','Гарниры','🍚',2,230,8,2,45,20,'Гречка сухая|140|г;Соль|2|г','Отварить гречку до готовности.'],
 ['Картофельное пюре','Гарниры','🥔',2,215,5,6,35,30,'Картофель|450|г;Молоко|100|мл;Сливочное масло|10|г','Отварить картофель, размять с тёплым молоком и маслом.'],
 ['Киноа отварная','Гарниры','🍚',2,245,9,4,43,20,'Киноа сухая|140|г;Соль|2|г','Промыть киноа и отварить до готовности.'],
 ['Овощной салат','Овощи и добавки','🥗',2,85,3,5,8,10,'Помидоры|200|г;Огурцы|200|г;Руккола|50|г;Оливковое масло|10|г','Нарезать овощи, добавить рукколу и масло.'],
 ['Замороженные овощи','Овощи и добавки','🥦',2,95,5,3,13,12,'Замороженные овощи|400|г;Оливковое масло|5|г','Приготовить овощи на сковороде или на пару.'],
 ['Свёкла с брынзой','Овощи и добавки','🥗',2,145,6,9,12,10,'Свёкла варёная|300|г;Брынза|80|г','Нарезать свёклу и добавить раскрошенную брынзу.'],
 ['Банан','Фрукты и ягоды','🍌',1,105,1,0,27,0,'Банан|120|г','Очистить и съесть.'],
 ['Манго','Фрукты и ягоды','🥭',1,90,1,0,23,0,'Манго|150|г','Нарезать манго.'],
 ['Ягоды с греческим йогуртом','Перекусы','🫐',1,170,17,4,17,5,'Ягоды|120|г;Греческий йогурт|180|г','Смешать йогурт с ягодами.'],
 ['Творог с фруктами','Перекусы','🍓',1,235,28,6,18,5,'Творог 5%|180|г;Яблоко|130|г','Смешать творог и нарезанное яблоко.'],
 ['Пастила','Десерты','🍬',1,95,0,0,24,0,'Пастила|30|г','Готовый десерт.'],
 ['Скитлс','Десерты','🍭',1,160,0,2,36,0,'Skittles|40|г','Готовая сладость, КБЖУ сверять с упаковкой.'],
 ['Kinder Bueno','Десерты','🍫',1,245,4,15,24,0,'Kinder Bueno|43|г','Готовая сладость, КБЖУ сверять с упаковкой.'],
 ['Попкорн без масла','Десерты','🍿',1,115,4,1,22,5,'Зёрна кукурузы для попкорна|30|г','Приготовить без масла, по желанию слегка посолить.'],
 ['Мороженое','Десерты','🍦',1,160,3,7,22,0,'Мороженое|80|г','Готовый десерт, КБЖУ сверять с упаковкой.'],
 ['Рисовые хлебцы с творожным сыром','Перекусы','🥪',1,195,6,10,20,3,'Рисовые хлебцы|30|г;Творожный сыр|40|г','Намазать сыр на хлебцы.']
];
const makeSeed = (r,i) => ({id:'seed-'+(i+1),name:r[0],category:r[1],emoji:r[2],yield:r[3],kcal:r[4],protein:r[5],fat:r[6],carbs:r[7],minutes:r[8],ingredients:parseIngredients(r[9]),steps:r[10],youtube:'',note:'Демонстрационный рецепт. Проверь ингредиенты, вес и КБЖУ по своему способу приготовления.',isDemo:true});
let db, state, view='recipes', selectedCategory='Все', query='', weekOffset=0, selectedStatsDay=0;
const $ = (q,scope=document)=>scope.querySelector(q);
const $$ = (q,scope=document)=>Array.from(scope.querySelectorAll(q));
const esc = s => String(s??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now()+'-'+Math.random().toString(36).slice(2));
const number = x => Number.isFinite(Number(x)) ? Number(x) : 0;
const fmt = n => Math.round(n*10)/10;
const plural = (n,one,many) => n===1?one:many;
function parseIngredients(str){return str.split(/\n|;/).map(line=>{const p=line.split('|').map(s=>s.trim());return {name:p[0]||'',qty:number(p[1]),unit:p[2]||'г'};}).filter(x=>x.name);}
function ingredientsText(arr){return (arr||[]).map(x=>`${x.name} | ${x.qty} | ${x.unit}`).join('\n');}
function defaultState(){return {schema:1,recipes:seeds.map(makeSeed),plans:{},checks:{}};}
function openDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open('moya-kuhnya-database',1);req.onupgradeneeded=()=>req.result.createObjectStore('app');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
function storeValue(value){return new Promise((resolve,reject)=>{const tx=db.transaction('app','readwrite');tx.objectStore('app').put(value,'state');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
function loadValue(){return new Promise((resolve,reject)=>{const tx=db.transaction('app','readonly');const req=tx.objectStore('app').get('state');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
let saving=Promise.resolve();function save(){saving=saving.catch(()=>{}).then(()=>storeValue(state)).catch(err=>{console.error(err);toast('Не удалось сохранить данные. Сделай резервную копию.');});}
function toast(s){const e=$('#toast');e.textContent=s;e.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>e.classList.remove('show'),3000);}
function monday(offset=0){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7)+offset*7);return d;}
function iso(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function addDays(d,n){const copy=new Date(d);copy.setDate(copy.getDate()+n);return copy;}
function dayKey(i){return iso(addDays(monday(weekOffset),i));}
function weekKey(){return iso(monday(weekOffset));}
const dateLabel = d=>d.toLocaleDateString('ru-RU',{day:'numeric',month:'short'});
function meals(key){return state.plans[key] || [];}
function recipe(id){return state.recipes.find(x=>x.id===id);}
function macros(meal){const r=recipe(meal.recipeId);if(!r)return {kcal:0,protein:0,fat:0,carbs:0};let x=number(meal.servings)||1;return {kcal:number(r.kcal)*x,protein:number(r.protein)*x,fat:number(r.fat)*x,carbs:number(r.carbs)*x};}
function totals(key){return meals(key).reduce((sum,m)=>{const n=macros(m);for(const k of Object.keys(sum))sum[k]+=n[k];return sum;},{kcal:0,protein:0,fat:0,carbs:0});}
function mLabel(n){return `${Math.round(n.kcal)} ккал · Б ${fmt(n.protein)} · Ж ${fmt(n.fat)} · У ${fmt(n.carbs)}`;}
function showView(next){view=next;render();scrollTo({top:0,behavior:'instant'});}
function render(){const main=$('#main');if(view==='recipes')renderRecipes(main);if(view==='week')renderWeek(main);if(view==='shopping')renderShopping(main);if(view==='stats')renderStats(main);$$('.bottom-nav button').forEach(b=>{b.classList.toggle('active',b.dataset.tab===view);b.setAttribute('aria-current',b.dataset.tab===view?'page':'false');});}
function renderRecipes(main){const cats=['Все',...CATEGORIES];const matches=state.recipes.filter(r=>(selectedCategory==='Все'||r.category===selectedCategory)&&r.name.toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru')));main.innerHTML=`<div class="hero"><span class="eyebrow">ГОТОВИМ С УДОВОЛЬСТВИЕМ</span><h2>Что вкусного сегодня?</h2><p class="subtitle">Все любимые рецепты, идеи для меню и немного сладкого.</p></div><div class="section-head"><h2>Книга рецептов</h2><span class="pill">${state.recipes.length} блюд</span></div><input id="recipeSearch" class="search" placeholder="⌕ Найти рецепт..." value="${esc(query)}" aria-label="Найти рецепт"><div class="chip-row">${cats.map(c=>`<button type="button" class="chip ${c===selectedCategory?'active':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}</div><div id="recipeResults">${recipeCards(matches)}</div><button class="fab" id="newRecipe">＋ Рецепт</button>`;$('#recipeSearch').addEventListener('input',e=>{query=e.target.value;$('#recipeResults').innerHTML=recipeCards(state.recipes.filter(r=>(selectedCategory==='Все'||r.category===selectedCategory)&&r.name.toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'))));bindCards();});$$('[data-cat]').forEach(b=>b.onclick=()=>{selectedCategory=b.dataset.cat;render();});$('#newRecipe').onclick=()=>editRecipe();bindCards();}
function recipeCards(matches){return matches.length?`<div class="recipe-grid">${matches.map(r=>`<button class="recipe-card" type="button" data-recipe="${esc(r.id)}"><div class="recipe-art">${esc(r.emoji||'🍽️')}</div><div class="recipe-card-body"><div class="recipe-name">${esc(r.name)}</div><div class="recipe-meta">${esc(r.category)} · ${number(r.minutes)||'—'} мин</div><div class="recipe-kcal">${Math.round(number(r.kcal))} ккал / порция</div></div></button>`).join('')}</div>`:`<div class="empty"><span class="emoji">🍐</span>Ничего не найдено. Добавь свой рецепт!</div>`;}
function bindCards(){$$('[data-recipe]').forEach(b=>b.onclick=()=>viewRecipe(b.dataset.recipe));}
function showModal(title,body){$('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-top"><h2>${esc(title)}</h2><button type="button" class="icon-button" id="closeModal" aria-label="Закрыть">×</button></div><div class="modal-body">${body}</div></section></div>`;$('#closeModal').onclick=closeModal;$('.modal-backdrop').addEventListener('click',e=>{if(e.target.classList.contains('modal-backdrop'))closeModal();});}
function closeModal(){$('#modalRoot').innerHTML='';}
function viewRecipe(id){const r=recipe(id);if(!r)return;showModal(r.name,`<div class="detail-art">${esc(r.emoji||'🍽️')}</div><div class="subtle">${esc(r.category)} · ${number(r.minutes)||'—'} мин · ${number(r.yield)||1} порц.</div><div class="section-head"><h3>КБЖУ на порцию</h3><span class="pill">приблизительно</span></div><div class="nutrition-grid">${[['Ккал',r.kcal],['Белки',r.protein],['Жиры',r.fat],['Углеводы',r.carbs]].map(([label,n])=>`<div class="nutrition-cell"><strong>${fmt(number(n))}</strong><span>${label}</span></div>`).join('')}</div><div class="section-head"><h3>Ингредиенты</h3><span class="subtle">на ${r.yield} порц.</span></div><ul class="ingredient-list">${(r.ingredients||[]).map(i=>`<li><span>${esc(i.name)}</span><span class="amount">${fmt(number(i.qty))} ${esc(i.unit)}</span></li>`).join('')}</ul><div class="section-head"><h3>Приготовление</h3></div><p class="steps">${esc(r.steps||'Рецепт пока не заполнен.')}</p>${/^https:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)\//i.test(r.youtube||'')?`<p><a href="${esc(r.youtube)}" target="_blank" rel="noopener noreferrer">▶ Смотреть рецепт на YouTube ↗</a></p>`:''}${r.note?`<p class="notice">${esc(r.note)}</p>`:''}<div class="modal-actions"><button class="btn" id="addFromRecipe">＋ В меню</button><button class="btn secondary" id="editThis">Изменить</button><button class="btn ghost" id="deleteThis">Удалить</button></div>`);$('#addFromRecipe').onclick=()=>{closeModal();pickDestination(id);};$('#editThis').onclick=()=>editRecipe(id);$('#deleteThis').onclick=()=>{if(!confirm(`Удалить «${r.name}»? Записи о нём в меню также будут удалены.`))return;state.recipes=state.recipes.filter(x=>x.id!==id);for(const k of Object.keys(state.plans))state.plans[k]=state.plans[k].filter(m=>m.recipeId!==id);save();closeModal();render();toast('Рецепт удалён');};}
function editRecipe(id){const old=id?recipe(id):null;const r=old||{name:'',category:'Готовые блюда',emoji:'🍲',yield:2,kcal:0,protein:0,fat:0,carbs:0,minutes:30,ingredients:[],steps:'',youtube:'',note:''};showModal(old?'Редактировать рецепт':'Новый рецепт',`<form id="recipeForm"><div class="field"><label for="fName">Название *</label><input id="fName" required maxlength="110" value="${esc(r.name)}"></div><div class="two-cols"><div class="field"><label for="fCat">Категория</label><select id="fCat">${CATEGORIES.map(c=>`<option ${r.category===c?'selected':''}>${esc(c)}</option>`).join('')}</select></div><div class="field"><label for="fEmoji">Значок блюда</label><input id="fEmoji" maxlength="8" value="${esc(r.emoji)}"></div><div class="field"><label for="fYield">Выход, порций *</label><input id="fYield" type="number" min="1" max="99" step="1" required value="${r.yield}"></div><div class="field"><label for="fMinutes">Время, минут</label><input id="fMinutes" type="number" min="0" max="1000" value="${r.minutes}"></div></div><div class="field"><label for="fIngredients">Ингредиенты (на весь рецепт)</label><textarea id="fIngredients" spellcheck="false" placeholder="Куриная грудка | 500 | г\nРис сухой | 150 | г">${esc(ingredientsText(r.ingredients))}</textarea><span class="help">По одному продукту на строку: название | количество | единица. Названия одинаковых продуктов пиши одинаково — они суммируются в покупках.</span></div><div class="field"><label for="fSteps">Как готовить</label><textarea id="fSteps">${esc(r.steps)}</textarea></div><div class="field"><label for="fYoutube">Ссылка на YouTube</label><input id="fYoutube" type="url" placeholder="https://www.youtube.com/watch?v=..." value="${esc(r.youtube)}"></div><div class="section-head"><h3>КБЖУ на одну порцию</h3></div><div class="two-cols">${[['Калории, ккал','kcal'],['Белки, г','protein'],['Жиры, г','fat'],['Углеводы, г','carbs']].map(([title,key])=>`<div class="field"><label for="f${key}">${title}</label><input id="f${key}" type="number" min="0" max="10000" step="0.1" value="${r[key]}"></div>`).join('')}</div><div class="field"><label for="fNote">Заметки</label><textarea id="fNote">${esc(r.note||'')}</textarea></div><button type="submit" class="btn full">Сохранить рецепт</button></form>`);$('#recipeForm').onsubmit=e=>{e.preventDefault();const yieldNum=number($('#fYield').value);if(!Number.isInteger(yieldNum)||yieldNum<1||yieldNum>99){toast('Укажи целое количество порций от 1 до 99');return;}const ingText=$('#fIngredients').value.split('\n').filter(x=>x.trim());if(ingText.some(line=>{const p=line.split('|');return p.length!==3||!p[0].trim()||!Number.isFinite(Number(p[1]))||Number(p[1])<0||!p[2].trim();})){toast('Проверь ингредиенты: название | число | единица');return;}const url=$('#fYoutube').value.trim();if(url&&!/^https:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)\//i.test(url)){toast('Укажи ссылку YouTube с https://');return;}const updated={id:old?old.id:uid(),name:$('#fName').value.trim(),category:$('#fCat').value,emoji:$('#fEmoji').value.trim()||'🍲',yield:yieldNum,minutes:number($('#fMinutes').value),ingredients:parseIngredients($('#fIngredients').value),steps:$('#fSteps').value.trim(),youtube:url,note:$('#fNote').value.trim(),kcal:number($('#fkcal').value),protein:number($('#fprotein').value),fat:number($('#ffat').value),carbs:number($('#fcarbs').value),isDemo:false};if(!updated.name)return; if(old)state.recipes[state.recipes.findIndex(x=>x.id===old.id)]=updated;else state.recipes.unshift(updated);save();closeModal();showView('recipes');toast('Рецепт сохранён');};}
function renderWeek(main){const start=monday(weekOffset),end=addDays(start,6);main.innerHTML=`<div class="week-switch"><button class="arw" id="prevWeek" aria-label="Предыдущая неделя">‹</button><div><span class="eyebrow">ПЛАНИРУЕМ БЕЗ СПЕШКИ</span><h2>${dateLabel(start)} — ${dateLabel(end)}</h2></div><button class="arw" id="nextWeek" aria-label="Следующая неделя">›</button></div><div class="notice">Добавляй мясо, гарнир и овощи отдельно или выбирай готовое блюдо. Порции можно повторять — они автоматически попадут в покупки.</div><div style="height:12px"></div>${DAYS.map((d,i)=>{const key=dayKey(i),ms=meals(key),t=totals(key);return `<div class="day-card"><div class="day-header"><span class="day-title">${d}</span><span class="day-date">${dateLabel(addDays(start,i))}</span></div>${SLOTS.map(s=>{const found=ms.filter(m=>m.slot===s);return `<div class="slot-row"><div class="slot-info"><div class="slot-name">${s}</div><div class="slot-meals">${found.length?found.map(m=>{const r=recipe(m.recipeId);return `<button type="button" data-meal="${esc(m.id)}" data-date="${key}">${esc(r?r.name:'Удалённый рецепт')} × ${fmt(m.servings)}</button>`;}).join(' · '):'<span style="color:#b3a89e">—</span>'}</div></div><button class="add-mini" data-add="${key}" data-slot="${s}">＋</button></div>`;}).join('')}<div class="day-total">${mLabel(t)} ${t.protein>=100&&t.fat<=60&&t.kcal<=1700?'<span class="badge-green">✓ цель</span>':''}</div></div>`;}).join('')}<div class="footer-note">Цели: около 1700 ккал, белок от 100 г, жиры до 60 г. Данные приблизительные и зависят от введённых рецептов.</div>`;$('#prevWeek').onclick=()=>{weekOffset--;render();};$('#nextWeek').onclick=()=>{weekOffset++;render();};$$('[data-add]').forEach(b=>b.onclick=()=>pickRecipe(b.dataset.add,b.dataset.slot));$$('[data-meal]').forEach(b=>b.onclick=()=>editMeal(b.dataset.date,b.dataset.meal));}
function pickRecipe(date,slot){showModal(`Добавить · ${slot}`,`<input class="search" id="pickerSearch" placeholder="Поиск блюда"><div class="quick-select" id="pickerList"></div>`);const draw=()=>{const v=$('#pickerSearch').value.toLowerCase();$('#pickerList').innerHTML=state.recipes.filter(r=>r.name.toLowerCase().includes(v)).map(r=>`<div class="picker-row"><span class="emoji">${esc(r.emoji)}</span><button data-pick="${esc(r.id)}"><strong>${esc(r.name)}</strong><br><span class="subtle">${Math.round(r.kcal)} ккал / порция · ${esc(r.category)}</span></button></div>`).join('')||'<p class="subtle">Ничего не найдено</p>';$$('[data-pick]').forEach(b=>b.onclick=()=>{const r=recipe(b.dataset.pick);closeModal();showModal('Добавить порции',`<p><strong>${esc(r.name)}</strong></p><p class="help">1 порция = 1/${r.yield} от ингредиентов рецепта. Можно указать 0.5, 1, 2 и т. д.</p><div class="field"><label for="portionInput">Количество порций</label><input id="portionInput" type="number" min="0.1" max="100" step="0.5" value="1"></div><button class="btn full" id="confirmAdd">Добавить в меню</button>`);$('#confirmAdd').onclick=()=>{const n=number($('#portionInput').value);if(n<=0||n>100){toast('Укажи количество от 0.1 до 100');return;}state.plans[date]??=[];state.plans[date].push({id:uid(),slot,recipeId:r.id,servings:n});save();closeModal();render();toast('Добавлено в меню');};});};$('#pickerSearch').addEventListener('input',draw);draw();}
function pickDestination(rid){const start=monday(weekOffset);showModal('Добавить рецепт в меню',`<div class="field"><label for="destDay">День</label><select id="destDay">${DAYS.map((d,i)=>`<option value="${dayKey(i)}">${d}, ${dateLabel(addDays(start,i))}</option>`).join('')}</select></div><div class="field"><label for="destSlot">Приём пищи</label><select id="destSlot">${SLOTS.map(s=>`<option>${s}</option>`).join('')}</select></div><div class="field"><label for="destServings">Количество порций</label><input id="destServings" type="number" value="1" step="0.5" min="0.1" max="100"></div><button class="btn full" id="addDestination">Добавить</button>`);$('#addDestination').onclick=()=>{const n=number($('#destServings').value);if(n<=0||n>100){toast('Укажи количество порций');return;}const k=$('#destDay').value;state.plans[k]??=[];state.plans[k].push({id:uid(),slot:$('#destSlot').value,recipeId:rid,servings:n});save();closeModal();toast('Добавлено в меню');};}
function editMeal(date,id){const m=meals(date).find(x=>x.id===id);if(!m)return;const r=recipe(m.recipeId);showModal('Порция в меню',`<p><strong>${esc(r?.name||'Рецепт')}</strong></p><div class="field"><label for="editServings">Порций</label><input id="editServings" type="number" min="0.1" max="100" step="0.5" value="${m.servings}"></div><div class="modal-actions"><button class="btn" id="saveMeal">Сохранить</button><button class="btn danger" id="removeMeal">Удалить из меню</button></div>`);$('#saveMeal').onclick=()=>{const n=number($('#editServings').value);if(n<=0||n>100)return toast('Укажи количество порций');m.servings=n;save();closeModal();render();};$('#removeMeal').onclick=()=>{state.plans[date]=state.plans[date].filter(x=>x.id!==id);save();closeModal();render();};}
const groupOf = name => {const s=name.toLowerCase();if(/куриц|индей|фарш|говядин|ветчин|треск|лосос|кальмар|филе|яйц|яичн|краб/.test(s))return 'Мясо, рыба и яйца';if(/рис|греч|овсян|мука|хлеб|лаваш|макарон|чечевиц|кус|киноа|сухар|попкорн|зерн|хлебц/.test(s))return 'Крупы и хлеб';if(/молок|йогурт|сыр|творог|брынз|масло сливоч/.test(s))return 'Молочные продукты';if(/масло|специ|соль|пассата|чеснок|соус/.test(s))return 'Масла, соусы, специи';if(/пастил|skittles|kinder|морожен/.test(s))return 'Сладости';return 'Овощи, фрукты и другое';};
function shoppingData(){const sums=new Map();for(let i=0;i<7;i++){for(const m of meals(dayKey(i))){const r=recipe(m.recipeId);if(!r)continue;const factor=number(m.servings)/number(r.yield);for(const ing of r.ingredients||[]){const name=ing.name.trim(),unit=ing.unit.trim();const key=name.toLocaleLowerCase('ru')+'|'+unit.toLowerCase();if(!sums.has(key))sums.set(key,{name,unit,qty:0,group:groupOf(name),key});sums.get(key).qty+=number(ing.qty)*factor;}}}return [...sums.values()].sort((a,b)=>a.group.localeCompare(b.group,'ru')||a.name.localeCompare(b.name,'ru'));}
function renderShopping(main){const list=shoppingData(),key=weekKey();state.checks[key]??={};const checked=state.checks[key];const done=list.filter(x=>checked[x.key]).length;const grouped={};for(const item of list){(grouped[item.group]??=[]).push(item);}main.innerHTML=`<div class="section-head"><h2>Список покупок</h2><span class="pill">${done} / ${list.length}</span></div><p class="subtle">Неделя ${dateLabel(monday(weekOffset))} — ${dateLabel(addDays(monday(weekOffset),6))}. Ингредиенты всех блюд суммируются с учётом порций.</p><div class="week-switch"><button class="arw" id="prevWeek" aria-label="Предыдущая неделя">‹</button><span class="subtle">Выбранная неделя</span><button class="arw" id="nextWeek" aria-label="Следующая неделя">›</button></div>${!list.length?`<div class="empty"><span class="emoji">🧺</span>Здесь пока пусто. Добавь блюда в меню недели — продукты появятся автоматически.</div>`:Object.entries(grouped).map(([group,items])=>`<div class="panel shop-group"><h3>${esc(group)}</h3>${items.map(x=>`<label class="shop-item ${checked[x.key]?'checked':''}"><input type="checkbox" data-shop="${esc(x.key)}" ${checked[x.key]?'checked':''}><span class="shop-label">${esc(x.name)}</span><span class="shop-qty">${fmt(x.qty)} ${esc(x.unit)}</span></label>`).join('')}</div>`).join('')}<div class="modal-actions"><button class="btn secondary" id="copyShopping" ${!list.length?'disabled':''}>Скопировать список</button><button class="btn ghost" id="clearChecks" ${!done?'disabled':''}>Сбросить галочки</button></div><p class="footer-note">Единицы суммируются только если совпадают. Например, «Молоко» и «Молоко 2,5%» считаются разными продуктами. Для точного списка используй одинаковые названия и единицы.</p>`;$('#prevWeek').onclick=()=>{weekOffset--;render();};$('#nextWeek').onclick=()=>{weekOffset++;render();};$$('[data-shop]').forEach(e=>e.onchange=()=>{checked[e.dataset.shop]=e.checked;save();render();});$('#copyShopping').onclick=async()=>{const value=list.map(x=>`${checked[x.key]?'☑':'☐'} ${x.name} — ${fmt(x.qty)} ${x.unit}`).join('\n');try{await navigator.clipboard.writeText(value);toast('Список скопирован');}catch{showModal('Список покупок',`<textarea class="search" style="min-height:250px">${esc(value)}</textarea>`);}};$('#clearChecks').onclick=()=>{state.checks[key]={};save();render();};}
function renderStats(main){const start=monday(weekOffset),d=dayKey(selectedStatsDay),t=totals(d);const totalWeek=Array.from({length:7},(_,i)=>totals(dayKey(i)));const ave=totalWeek.reduce((a,x)=>{for(const k of Object.keys(a))a[k]+=x[k]/7;return a;},{kcal:0,protein:0,fat:0,carbs:0});main.innerHTML=`<div class="section-head"><h2>Твой баланс</h2><span class="pill">цель ~1700 ккал</span></div><div class="notice">КБЖУ рассчитаны по примерным значениям рецептов. Это планировщик питания, не медицинская оценка рациона.</div><div class="chip-row">${DAYS.map((s,i)=>`<button class="chip ${i===selectedStatsDay?'active':''}" data-statday="${i}">${s.slice(0,2)}</button>`).join('')}</div><div class="panel"><span class="subtle">${DAYS[selectedStatsDay]}, ${dateLabel(addDays(start,selectedStatsDay))}</span><h2 style="margin:9px 0">${Math.round(t.kcal)} <span style="font-size:14px;color:var(--muted);font-family:system-ui">/ 1700 ккал</span></h2><div class="progress ${t.kcal>1700?'over':''}"><span style="width:${Math.min(100,Math.max(0,t.kcal/1700*100))}%"></span></div><div style="height:19px"></div>${[['Белки',t.protein,100,'мин.'],['Жиры',t.fat,60,'макс.'],['Углеводы',t.carbs,null,'']].map(([label,value,goal,rel])=>`<div class="stat-row"><strong>${label}</strong><span>${fmt(value)} г ${goal?' / '+rel+' '+goal+' г':''}</span></div>${goal?`<div class="progress ${label==='Жиры'&&value>goal?'over':''}"><span style="width:${Math.min(100,value/goal*100)}%"></span></div><div style="height:14px"></div>`:''}`).join('')}<p class="help">${t.protein<100?'До ориентира по белку не хватает '+fmt(100-t.protein)+' г.':'Белок: цель достигнута.'} ${t.fat>60?'Жиры выше выбранного предела.':'Жиры в пределах выбранного максимума.'}</p></div><div class="section-head"><h3>Вся неделя</h3></div><div class="panel">${totalWeek.map((x,i)=>`<div class="stat-row"><span>${DAYS[i].slice(0,2)}, ${dateLabel(addDays(start,i))}</span><span>${Math.round(x.kcal)} ккал · Б ${Math.round(x.protein)} · Ж ${Math.round(x.fat)}</span></div>`).join('')}<hr style="border:0;border-top:1px solid var(--line);margin:14px 0"><div class="stat-row"><strong>Среднее за день</strong><strong>${Math.round(ave.kcal)} ккал</strong></div><div class="subtle">Б ${fmt(ave.protein)} · Ж ${fmt(ave.fat)} · У ${fmt(ave.carbs)} г</div></div>`;$$('[data-statday]').forEach(b=>b.onclick=()=>{selectedStatsDay=Number(b.dataset.statday);render();});}
function settings(){showModal('Настройки и копии',`<div class="panel"><h3>Твои данные — на телефоне</h3><p class="subtle">Рецепты и меню сохраняются локально в IndexedDB браузера. Они не отправляются на сервер. Очистка данных сайта или потеря телефона может удалить их.</p><div class="notice">Рекомендуем регулярно скачивать резервную копию и хранить её вне браузера — например, в папке «Загрузки» и отдельно на другом носителе.</div></div><div class="section-head"><h3>Резервное копирование</h3></div><button class="btn full" id="exportData">↓ Скачать базу (JSON)</button><div style="height:10px"></div><button class="btn secondary full" id="importData">↑ Восстановить из JSON</button><input id="importFile" type="file" accept="application/json,.json" hidden><p class="help">Импорт полностью заменит текущие рецепты, меню и галочки покупок. Сначала сделай экспорт.</p><div class="section-head"><h3>Обновление приложения</h3></div><p id="updateStatus" class="subtle" role="status">Текущая версия: 1.0.2</p><button type="button" class="btn secondary full" id="checkForUpdate">↻ Проверить обновления</button><div style="height:10px"></div><button type="button" class="btn full" id="installUpdate" hidden>Установить новую версию</button><p class="help">Обновление не удаляет рецепты. Перед крупными обновлениями скачай JSON-копию. Во время редактирования рецепт лучше сначала сохранить.</p><div class="section-head"><h3>Приложение</h3></div><p class="subtle">Версия 1.0.2 · Без аккаунтов и подписок · КБЖУ стартовых рецептов приблизительные.</p><button class="btn ghost full" id="resetData">Вернуть демонстрационную базу</button>`);$('#checkForUpdate').onclick=checkForUpdates;$('#installUpdate').onclick=activateUpdate;refreshUpdateUI();$('#exportData').onclick=exportData;$('#importData').onclick=()=>$('#importFile').click();$('#importFile').onchange=importData;$('#resetData').onclick=()=>{if(!confirm('Удалить ВСЕ собственные рецепты, меню и покупки и вернуть демонстрационные данные?'))return;state=defaultState();save();closeModal();showView('recipes');toast('Демо-база восстановлена');};}
function exportData(){const body=JSON.stringify({app:'moya-kuhnya',exportedAt:new Date().toISOString(),...state},null,2);const url=URL.createObjectURL(new Blob([body],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`moya-kuhnya-backup-${iso(new Date())}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);toast('Резервная копия подготовлена');}
async function importData(e){const file=e.target.files?.[0];if(!file)return;try{if(file.size>10*1024*1024)throw Error('Файл больше 10 МБ');const obj=JSON.parse(await file.text());if(obj.app!=='moya-kuhnya'||obj.schema!==1||!Array.isArray(obj.recipes)||!obj.plans||typeof obj.plans!=='object'||Array.isArray(obj.plans))throw Error('Это не резервная копия «Моей кухни»');if(obj.recipes.length>5000)throw Error('Слишком много рецептов');for(const r of obj.recipes){if(typeof r.id!=='string'||typeof r.name!=='string'||!CATEGORIES.includes(r.category)||!Array.isArray(r.ingredients)||!Number.isFinite(Number(r.yield))||Number(r.yield)<=0||r.ingredients.some(x=>typeof x.name!=='string'||typeof x.unit!=='string'||!Number.isFinite(Number(x.qty))))throw Error('Ошибка структуры рецептов');}for(const [key,list] of Object.entries(obj.plans)){if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||!Array.isArray(list)||list.some(m=>typeof m.recipeId!=='string'||!SLOTS.includes(m.slot)||!Number.isFinite(Number(m.servings))||m.servings<=0))throw Error('Ошибка структуры меню');}if(!confirm('Заменить текущую базу данными из файла? Это действие нельзя отменить.'))return;state={schema:1,recipes:obj.recipes,plans:obj.plans,checks:obj.checks&&typeof obj.checks==='object'&&!Array.isArray(obj.checks)?obj.checks:{}};save();closeModal();render();toast('База восстановлена');}catch(err){alert('Не удалось загрузить копию: '+err.message);}}
async function init(){try{db=await openDB();state=await loadValue();if(!state||!Array.isArray(state.recipes)||!state.plans){state=defaultState();await storeValue(state);}}catch(err){console.error(err);$('#main').innerHTML=`<div class="empty"><span class="emoji">⚠️</span>Не удалось открыть локальную базу. Проверь, что приложение открыто через HTTPS и в обычном режиме браузера, а не в режиме инкогнито.<p class="subtle">${esc(err.message)}</p></div>`;return;}$$('.bottom-nav button').forEach(b=>b.onclick=()=>showView(b.dataset.tab));$('#openSettings').onclick=settings;render();setupUpdates();}
init();

// Updates are separate from app data. Do not change IndexedDB schema or reset state.
const APP_VERSION = '1.0.2';
let swRegistration = null;
let swChecking = false;
let swInstallRequested = false;
let swHadController = false;
function refreshUpdateUI(message) {
  const status = document.querySelector('#updateStatus');
  const waiting = swRegistration?.waiting;
  if (status) status.textContent = message || (waiting ? 'Новая версия доступна для установки.' : `Текущая версия: ${APP_VERSION}. Данные рецептов хранятся на устройстве.`);
  const install = document.querySelector('#installUpdate');
  if (install) install.hidden = !waiting;
  const check = document.querySelector('#checkForUpdate');
  if (check) check.disabled = swChecking;
  const banner = document.querySelector('#newVersionBanner');
  if (banner) banner.hidden = !waiting;
}
function showUpdateBanner() {
  if (!document.querySelector('#newVersionBanner')) {
    const banner = document.createElement('div');
    banner.id = 'newVersionBanner';
    banner.className = 'update-banner';
    banner.innerHTML = '<span>Доступна новая версия «Моей кухни»</span><button type="button" id="bannerUpdate">Обновить</button>';
    document.querySelector('.topbar')?.insertAdjacentElement('afterend', banner);
    banner.querySelector('button').addEventListener('click', () => {
      settings();
      refreshUpdateUI();
    });
  }
  refreshUpdateUI();
}
function watchInstalling(worker) {
  if (!worker) return;
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed' && navigator.serviceWorker.controller && swRegistration?.waiting) {
      showUpdateBanner();
      toast('Есть обновление «Моей кухни»');
    }
  });
}
async function setupUpdates() {
  if (!('serviceWorker' in navigator) || location.protocol !== 'https:') return;
  swHadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (swInstallRequested) {
      swInstallRequested = false;
      location.reload();
    } else {
      refreshUpdateUI();
    }
  });
  try {
    swRegistration = await navigator.serviceWorker.register('./sw.js', {updateViaCache: 'none'});
    if (swRegistration.waiting && navigator.serviceWorker.controller) showUpdateBanner();
    swRegistration.addEventListener('updatefound', () => watchInstalling(swRegistration.installing));
    watchInstalling(swRegistration.installing);
    // Browser will also check periodically. Manual check remains available.
  } catch (error) {
    console.warn('Service Worker registration failed:', error);
  }
}
async function checkForUpdates() {
  const status = document.querySelector('#updateStatus');
  if (!('serviceWorker' in navigator) || !swRegistration) {
    refreshUpdateUI('Проверка недоступна. Подключись к интернету и открой приложение через HTTPS.');
    return;
  }
  if (!navigator.onLine) {
    refreshUpdateUI('Нет подключения к интернету. Проверь соединение и повтори.');
    return;
  }
  swChecking = true;
  refreshUpdateUI('Проверяем наличие новой версии…');
  try {
    if (swRegistration.waiting) {
      showUpdateBanner();
      refreshUpdateUI('Обновление уже загружено и готово к установке.');
      return;
    }
    await swRegistration.update();
    if (swRegistration.waiting) {
      showUpdateBanner();
      refreshUpdateUI('Доступна новая версия. Нажми «Установить новую версию».');
    } else if (swRegistration.installing) {
      refreshUpdateUI('Обновление загружается. После загрузки появится кнопка установки.');
      watchInstalling(swRegistration.installing);
    } else {
      refreshUpdateUI('Проверено: новых обновлений нет.');
    }
  } catch (error) {
    console.warn('Update check failed:', error);
    refreshUpdateUI('Не получилось проверить обновления. Проверь интернет и повтори.');
  } finally {
    swChecking = false;
    const check = document.querySelector('#checkForUpdate');
    if (check) check.disabled = false;
  }
}
function activateUpdate() {
  if (!swRegistration?.waiting) return refreshUpdateUI('Обновление пока не загружено.');
  if (!confirm('Установить обновление и перезапустить приложение? Сохрани открытый рецепт перед продолжением.')) return;
  swInstallRequested = true;
  refreshUpdateUI('Устанавливаем обновление…');
  swRegistration.waiting.postMessage({type:'SKIP_WAITING'});
}
