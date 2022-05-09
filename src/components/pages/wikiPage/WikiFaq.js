const WikiFaq = () => {
  return (
    <div className="wiki-page__faq">
      <h2 className="titleh2">Ответы на часто задаваемые вопросы</h2>
      <ul>
        <li className="b">Можно ли играть на сервере с пиратской версии?</li>
        <li className="o">
          На сервере можно играть как с лицензионной, так и с пиратской версии.
        </li>
        <li className="b">Какая версия у сервера?</li>
        <li className="o">
          Версия сервера - <span>1.19</span>
        </li>
        <li className="b">Какой IP-адрес у сервера?</li>
        <li className="o">
          IP-адрес сервера - <span>play.mixlands.fun</span>
        </li>
        <li className="b">Сколько стоит проходка?</li>
        <li className="o">
          На данный момент проходка стоит <span>200 рублей</span>.
        </li>
        <li className="b"> Какое ограничение мира?</li>
        <li className="o">
          На данный момент ограничение мира <span>10000 на 10000 блоков</span>.
        </li>
        <li className="b">Какая валюта у сервера?</li>
        <li className="o">
          На данный момент валюта сервера - <span>МиксКоины</span> (алмазная
          руда).
        </li>
        <li className="b">Есть ли на сервере приваты?</li>
        <li className="o">
          Нет, на сервере нет приватов. Сервер основан на доверии игроков.
        </li>
        <li className="b">Есть ли на сервере донат-привелегии?</li>
        <li className="o">
          Нет, на сервере нет донат-привелегий. Сервер имеет ванильную
          тематику.
        </li>
      </ul>
    </div>
  );
};

export default WikiFaq;
