import { FC } from 'react';
import './rules.scss';

const Rules: FC = () => {
   return (
      <div className="rules fade-animation">
         <h3 className="text-center font-bold text-xl mt-3">
            Основные правила
         </h3>
         <ol>
            <li>
               Запрещен пиар других серверов, сообществ, а также продвижение
               различных видов услуг и товаров, продажа или стимулирование
               продаж запрещенных веществ или потенциально опасных товаров,
               учетной записи или сервера, ссылки или приглашения, отправленные
               в любой из чатов на сервере, реклама в голосовых каналах,
               рассылка рекламы участникам сервера.
            </li>
            <li>
               Запрещен слив личной информации участника сервера, а также
               распространение контента сексуального содержания с другими
               людьми, а также интимных фотографий с целью опозорить другого
               человека.
            </li>
            <li>
               Запрещена угроза причинения вреда, жестокость, непрямые угрозы
               или доксинг.
            </li>
            <li>
               Запрещена демонстрация, публикация, распространение NSFW контента
               в видео и аудио формате — шокирующий контент или контент,
               запрещенный правилами Discord, контента поощряющего или
               призывающего к нанесению себе увечий или самоубийству,
               восхваляющий анорексию, булимию или другие расстройства пищевого
               поведения, а также публикация запрещенной символики. Запрещена
               демонстрация материалов эротического, нацистского, (в частности
               политического), расистского характера, насилия, жестокости.
            </li>
            <li>
               Запрещено упоминание и обсуждение политики, религии, психического
               и физического здоровья, суицида, наркотиков, терроризма.
            </li>
            <li>
               Запрещена отправка вирусов или вредоносных программ, а также
               деятельность направленная на взломом или организация DDoS-атак.
            </li>
            <li>
               Запрещены оскорбления любого формата на сервере: оскорбление
               личности человека, оскорбления его родных, национализм,
               дискриминация (по любому признаку — половому, возрастному, по
               инвалидности, роду занятий или сексуальной ориентации),
               религиозные конфликты.
            </li>
            <li>
               Запрещены создание, подстрекание к конфликтной ситуации.
               Агрессивный троллинг, направленный на возбуждение ненависти,
               вражды, конфликтной обстановки в чате.
            </li>
            <li>
               Запрещены флуд, спам, капс и их подвиды, а также несоблюдение
               тематики чата.
            </li>
            <li>
               Запрещено беспричинное и многократное упоминание ролей,
               пользователей и персонала.
            </li>
            <li>
               В голосовых каналах запрещено издавать громкие звуки,
               раздражающие других пользователей, использовать SoundPad в
               корыстных целях.
            </li>
            <li>
               Запрещен спам реакциями и реакции, несущие в себе оскорбительный
               контекст.
            </li>
            <li>
               Запрещено препятствие работы модераторов (в том числе публичное
               обсуждение варнов, мутов, банов). Чтобы оспорить решение
               модераторов используйте специальные каналы.
            </li>
            <li>
               Запрещается создание мультиаккаунтов на сервере для обхода
               наказания/абуза ботов, намеренная помеха нормальной работе
               сервера/ботов, написание команд ботов не в канал.
            </li>
            <li>
               Запрещен обман, оскорбления, неуважительное отношение, а также
               попытки дискредитации администрации и модерации сервера.
            </li>
            <li>
               Запрещены деструктивные действия по отношению к серверу:
               неконструктивная критика, призывы покинуть сервер, попытки
               нарушить развитие сервера или любые другие действия, способные
               привести к помехам в процессе развития сервера. Чтобы выразить
               недовольство или оставить пожелание используйте.
            </li>
            <li>
               Запрещено выдавать себя за другого человека (В том числе
               использовать одинаковые ники и автарки).
            </li>
            <li>
               Запрещены ники, содержащие провокационные выражения, оскорбления,
               запрещенную символику запрещены.
            </li>
            <li>
               Запрещены аватарки, баннеры, содержащие
               провокационный/откровенный контент, запрещенную символику.
            </li>
         </ol>
         <h3 className="text-center font-bold text-xl mt-12 mb-3">
            Правила игрового процесса
         </h3>
         <ol>
            <li>
               Запрещено использование любых программ, читов, макросов,
               скриптов, кликеров, модов которые позволяют смотреть через блоки
               и т.д. Исключение: Разрешены скрипты в виде биндов. Возможны
               другие исключения.
            </li>
            <li>
               Запрещено использовать дюпы или скрывать их от Администрации.
            </li>
            <li>
               Запрещено использование багов или скрытие их от Администрации.
            </li>
            <li>Запрещен абуз деспавном мобов.</li>
            <li>
               Запрещена купля-продажа игровых ресурсов за реальные деньги.
            </li>
            <li>
               Запрещена любая пропаганда или публичное демонстрирование
               фашизма, нацизма. Например: Открытие партии с пропагандой.
            </li>
            <li>
               Запрещено поджигать, ломать, взрывать, рейдить здания или
               сооружения. Исключение: По определенному указу и закону от
               правительства есть разрешение сносить объект. Полиция имеет право
               осуществлять рейды. По решению Администрации разрешен данный РП
               процесс.
               <p className="font-bold mt-3">Примечание к пункту 2.7</p>
               Правило не влияет на ивенты одобренные двумя сторонами или
               Администрацией.
            </li>
            <li>
               Запрещено без предупреждения Главной Администрации осуществлять
               РП ивенты, которые могут затронуть не относящихся лиц, здания,
               сооружения, город, к данному РП. Главная Администрация должна
               дать на это ответ, без ответа, осуществлять данное запрещается.
               Предупреждение должно осуществляться за 1 день.
            </li>
            <li>
               Запрещено преувеличение игровых возможностей персонажа. Например:
               /me достал супер топор и убил 5 человек в этой комнате.
            </li>
            <li>
               Запрещено убивать игроков с целью закончить игровую жизнь
               персонажа без их согласия. Исключение: Игрок вступивший в РП
               процесс, тем самым отыграв роль своей смерти.
            </li>
            <li>Запрещено убийство(а) без отыгрыша РП.</li>
            <li>Запрещено убийство(а) без весомой причины.</li>
            <li>
               Запрещено убийство или нанесение урона игроку который только
               заспавнился.
            </li>
            <li>
               Запрещено убивать животных игроков без весомой причины и отыгрыша
               РП.
            </li>
            <li>
               Запрещено отсутствие боязни за свою жизнь. Например: Бегать со
               сломанной ногой, нападение с одним мечом и щитом на 2 вооруженных
               игроков.
            </li>
            <li>
               Запрещено забирать ресурсы игроков после их смерти без РП
               отыгровки. Разрешено брать ресурсы игроков с целью возвращению их
               владельцу без РП отыгровки.
            </li>
            <li>Запрещен уход от РП ситуации или игнорирование.</li>
            <li>
               Запрещено выходить из игры во время РП ситуации. Возможны
               исключения.
            </li>
            <li>
               Запрещено отыгрывать РП с персонажем который находится АФК.
               Исключение: Игрок встал в АФК во время РП процесса.
            </li>
            <li>
               Запрещено любое взаимодействие с человеком в АФК. Исключение:
               Игрок встал в АФК во время РП процесса.
            </li>
            <li>
               Запрещено намеренно затягивать РП процесс. Например: Игрок лежит
               пол часа без сознания. Исключение: Другая сторона согласна на
               данный РП процесс. Наказание будет выдано в том случае, если
               невинный игрок подал жалобу на нарушителя.
            </li>
            <li>
               Запрещено абузить /me и /try. Например: У игрока не получается
               выполнить какое-либо действие через /try и он переходит на /me.
               Повторно писать /try если у игрока не сложилось задуманное по его
               мнению с первого раза.
            </li>
            <li>Запрещено НРП использование команды /me, /do или /try.</li>
            <li>
               Запрещены НРП постройки. Например: Построить чл*н, свастику и
               т.д.
            </li>
            <li>Запрещено застраивать игрока блоками.</li>
            <li>
               Запрещены провокации игроков на нарушение правил. Игрок
               поддавшись на провокации, получит наказание по нарушенным
               правилам.
            </li>
            <li>Запрещено НРП разжигание ненависти из реальной жизни.</li>
         </ol>
         <h3 className="text-center font-bold text-xl mt-12 mb-3">
            Правила игрового общения
         </h3>
         <ol>
            <li>Голосовой чат является полностью РП составляющей.</li>
            <li>Написать НРП информацию в чат - ((Текст)).</li>
            <li>НРП чат относится только к серверу.</li>
            <li>Запрещена НРП информация в голосовом чате.</li>
            <li>
               Запрещено включать музыку в голосовом чате. Исключение: Игрок
               использует “Звуковое оборудование”.
            </li>
            <li>Запрещено рекламировать любые сторонние ресурсы.</li>
            <li>Запрещено намеренно шуметь в голосовой чат.</li>
            <li>
               Запрещено использовать голосовой чат с целью отыгровки РП
               действий. Например: Говорить в голосовом чате /me ударил человека
               напротив. Это относится и к НРП словам в голосом чате (( Текст
               )).
            </li>
            <li>
               Запрещено использовать сторонние программы для изменения голоса.
               Исключение: Игрок с самого начала отыгрывает измененный голос с
               момента создания персонажа.
            </li>
            <li>
               Запрещено использовать сторонние программы для изменения голоса.
               Исключение: Игрок с самого начала отыгрывает измененный голос с
               момента создания персонажа.
            </li>
         </ol>
         <h3 className="text-center font-bold text-xl mt-12 mb-3">
            Правила игрового персонажа
         </h3>
         <p className="text-lg">
            <i>
               Игрокам разрешено использовать обнаженные по РП скины если они не
               подвергают бану игроков которые используют “Стриминговые
               платформы”, ведя прямой эфир. Использование обнаженного скина на
               ваш страх и риск.
            </i>
         </p>
         <p className="text-lg mt-3">
            <i>
               Государственным организациям разрешено носить на скинах
               спецодежду, скрывающее лицо игрока. Например: медицинские маски,
               шлем защищающий лицо, банданы, камуфляж и т.д.
            </i>
         </p>
         <ol>
            <li>
               Запрещен НРП скин. К НРП относятся скины не похожие на человека.
               Например: Киборги, животные, овощи и т.д. Исключение: У вашего
               персонажа прописана его внешность в “квенте”.
            </li>
            <li>
               Запрещены скины отображающие нацистские знаки. Исключение: Скины
               похожие на определенный нацизм, но без знака, считаются РП.
            </li>
            <li>Запрещен скин с минимальной пикселизацией.</li>
            <li>
               Запрещено ставить скины уже существующих игроков проекта.
               Исключение: Отыгровка РП от обоих. Наказание будет выдано в том
               случае, если невинный игрок подал жалобу на нарушителя.
            </li>
            <li>
               Запрещено ставить скины медийных личностей. Например: Заквиель,
               Демастер и так далее. Возможны исключения.
            </li>
         </ol>
         <h3 className="text-center font-bold text-xl mt-12 mb-3">
            Правила строительства
         </h3>
         <p className="text-lg">
            <i>Размер спавна - 500x500 блоков от координат X: 0 / Z: 0</i>
         </p>
         <p className="text-lg mt-3">
            <i>
               Строительство в зоне спавна запрещено! В случае, если Вы
               построитесь в зоне спавна - постройка будет снесена, ресурсы
               возвращены Вам.
            </i>
         </p>
         <h3 className="text-center font-bold text-xl mt-12 mb-3">
            Прочие правила
         </h3>
         <p className="text-lg">
            <i>
               Администратор проекта вправе отойти от выше указанных правил и
               выдать наказание участнику по своей причине.
            </i>
         </p>
      </div>
   );
};

export default Rules;