import {insertData, getData, updateData, deleteData} from './server.js';
import {onClick} from './webSocket.js';

const informations = [
    `<p class="MsoNormal" style="font-weight: bold">Gesamtkonzeption <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Die Agile Unlearning Canvas (AUC) ist für den Einsatz in Retrospektiven konzipiert und adressiert Teams (team/group unlearning support).</p>
        <p>Die Canvas, ihre Feldergruppen sowie die einzelnen Felder sollen von SCRUM-Teams intuitiv verstanden werden. Dazu sollen auf nützliche Weise Konzepte aus der agilen Welt bzw. SCRUM, die den Teams bekannt sind, mit Konzepten des Verlernens kombiniert werden, die den Teams in dieser Art so noch nicht bekannt sind.<o:p></o:p></p>
        <p>Durch die Nummerierung und die räumliche Anordnung der Felder soll eine leichte Navigation durch die Canvas ermöglicht werden, die den Verlernprozess subtil unterstützt. </p>
        <p>Damit die Teams möglichst selbstorganisiert während einer Retrospektive die Canvas nutzen können, daher ist eine angemessene Anleitung durch die AUC (‚guidance‘) wichtig. Damit die Felder korrekt und sinnvoll befüllt werden können, spielen Symbole, Titel, sowie Erklärungen und Leitfragen eine große Rolle. </p>`,

    `<p class="MsoNormal" style="font-weight: bold">Knowledge Impediments <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Jedes SCRUM-Team ist einzigartig und entwickelt mit der Zeit eine eigene Team-Kultur. Dabei entstehen ganz bestimmte Strukturen im Denken und Handeln, die das Team für sinnvoll hält, um ein nützliches Software-Produkt und Mehrwert für den Kunden zu generieren. Jedoch können diese Wissenstrukturen selbst zum Hindernis werden und so die Qualität des Produkts negativ beeinflussen. Diese ‚Knowledge Impediments‘ stören den SCRUM-Prozess. Daher sollte ein SCRUM-Team seine Denkweisen und Praktiken, d. h. sein bisheriges Wissen, kontinuierlich hinterfragen, um hinderliche Strukturen zu identifzieren und sich gezielt von diesen lösen.</p>
        <p>Der Prozess des ‚Agilen Verlernens‘ beginnt damit, dass jedes Teammitglied im Rahmen eines Brainstormings zu Wort kommt und aufschreibt, wo hinderliche Wissensstrukturen gesehen werden. Am Ende ergibt sich ein gemeinsames Bild hinderlicher Strukturen, mit dem weitergearbeitet werden kann im Verlernprozess.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">
                Welche Strukturen im Denken und Handeln hindern uns? 
                <p style="font-style:italic;margin-top:0;margin-bottom:0;">(z.B. veraltete Programmiersprachen, Umgang mit technischen Schulden, geringe Einheitlichkeit beim Testen der Softwarequalität, etc.)
                <o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Wissenstrukturen sollten wir ändern? <o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Targeting & Prioritization<o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Wenn man alle ‚Knowledge Impediments‘ auf einmal angeht, dann kann es das SCRUM-Team schnell stressen, weil Verlernen ein sehr persönlicher und emotionaler Prozess ist. Daher sollten Teams nicht versuchen alle hinderlichen Wissensstrukturen auf einmal zu beseitigen. <o:p></o:p></p>
        <p>Um zu entscheiden, welches Knowledge Impediment zuerst verlernt werden soll, empfiehlt es sich, dass jedes Teammitglied genau eine Wissensstruktur als relevant auswählt. Bei der Auswahl können sich Teammitglieder an Dringlichkeit, Einfluss auf die Qualität des Produkts, Einfluss auf die Produktivität im Team oder ähnliche Faktoren orientieren. So erhält das Team schließlich eine konkrete Wissensstrultur, die gemeinsam als am wichtigsten bzw. dringendsten erachtet wird und von der sich das Team lösen möchte.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Wissensstruktur stellt das größte Hindernis für uns als Team dar?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Von welcher Wissensstruktur wollen wir uns als erstens lösen?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Team Reflection <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Nachdem ihr als Team ein Knowledge Impediment priorisiert und zum Ziel gemacht habt, ist es jetzt wichtig, dass ihr gemeinsam als Team reflektiert, warum genau diese Wissensstruktur ausgewählt wurde. Bevor ihr gemeinsam verlernt, solltet ihr sicherstellen, dass ihr genau wisst, welches Verständnis jedes Teammitglied hat und darauf aufbauend ein gemeinsames Verständnis entwickeln.<o:p></o:p></p>
        <p>Ähnlich wie beim Brainstorming zu Beginn sollte jedes Teammitglied seine Sicht auf das Knowledge Impediment teilen und dann ein gemeinsame Sicht entwickelt werden. Es empfiehlt sich mindestens aus der Sicht jeder SCRUM-Rolle auf die hinderliche Wissensstruktur zu blicken.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was sehen wir als Team an der Wissensstruktur hinderlich?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Ist die Wissensstruktur für jede Rolle in gleichem Maße hinderlich?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Shared Perspective <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Um die gemeinsam ausgewählte Wissenstruktur als Hindernis zu beseitigen, gilt es nach vorne zu blicken. Hierfür wurde bereits bei der Reflexion versucht eine Team-Perspektive einzunehmen und den Problemcharakter gemeinsam zu erkunden.<o:p></o:p></p>
        <p>Jetzt geht es darum, eine gemeinsame Perspektive zur Veränderung zu schaffen. Ihr sollt eine Team-Sicht entwickeln, um zu bestimmen, welche Erwartungen ihr an eine Veränderung habt und was konkret verbessert wird für euch als Team, wenn ihr euch von der hinderlichen Wissensstruktur gelöst habt.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was wird für uns besser, sobald wir uns von der hinderlichen Wissensstruktur gelöst haben?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was erwarten wir uns als Team von der Veränderung?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Unlearning Vision <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Um später festzustellen, ob ihr euch im Team in die richtige Richtung entwickelt habt und alles nach Plan gelaufen ist, empfiehlt es sich vorab, eine Vision zu entwickeln. Diese Vision soll euch helfen bereits jetzt schon über Entwicklungen nachzudenken, die ihr durch das Verlernen anstoßt.<o:p></o:p></p>
        <p>Konkret geht es darum, dass ihr euch schon jetzt fragt, wie ihr künftig als Team im SCRUM-Prozess arbeiten werdet, sobald ihr euch von der hinderlichen Wissensstruktur gelöst habt. Manche zu erwartende Entwicklungen und Ergebnisse helfen euch und sind positiv, manche erzeugen vielleicht weitere Hindernisse. Macht euch dessen bewusst.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie stellen wir uns den Zustand vor, wenn wir als Team erfolgreich verlernt haben?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche konkreten Vorteile werden wir durch das Verlernen erreichen?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Nachteile sind durch das Verlernen möglich?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Definition of Unlearned (DoU) <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Jedes SCRUM-Team definiert für sich, wann eine Story erledigt ist – die sog. ‚definition of done‘. Für den Prozess des agilen Verlernens ist es ebenso wichtig zu definieren, wann ein Knowledge Impediment verlernt wurde und der Prozess als abgeschlossen betrachtet werden kann.<o:p></o:p></p>
        <p>Macht euch daher als Team bewusst, was ‚verlernen‘ konkret für euch, euer Produkt und eure Team-Kultur bedeutet. Manchmal reicht es für eine bestimmte Zeit den Einfluss bisherigen Wissens zu reduzieren anstatt ihn vollständig zu eliminieren. Wichtig ist, dass ihr ein gemeinsames Commitment und Verständnis für die Veränderungen schafft, die das Verlernen mit sich bringt. Auf diese Weise schafft ihr vorab Akzeptanz für die Veränderungen durch das Verlernen und kultiviert in eurem Team eine nachhaltige Kultur des Verlernens.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wollen wir uns von der gesamten hinderlichen Wissensstruktur lösen?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Ab wann haben wir uns ‚gelöst‘ und woran machen wir das fest?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Definition von ‚verlernt‘ wollen wir für uns als Team festlegen?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Intervention Planning <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Das Verlernen im Team sollte gezielt und bewusst erfolgen. Dazu ist Planung notwendig. Ihr müsst euch als Team vorbereiten, wie ihr Schritt für Schritt vorgehen wollt, um euch vom gemeinsam ausgewählten Knowledge Impediment zu lösen.<o:p></o:p></p>
        <p>Macht euch im Team bewusst, wie ihr an den Verlernprozess konkret herangehen möchtet. Schafft die Bedingungen, die euch als Team sowie jedem Teammitglied optimal beim Verlernen unterstützen. Macht euch allen nochmals klar, welches Knowledge Impediment ihr verlernen wollt, was der Grund dafür war, was ihr euch davon erwartet und welche Definition of Unlearned (DoU) ihr anwendet.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was brauchen wir für den Verlernprozess im Allgemeinen?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Worauf müssen wir konkret für das von uns ausgewählte Knowledge Impediment achten?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Action Items <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Wie in Schritt 2 ist es hier wichtig festzulegen, welche Teilschritte ihr zunächst angehen wollt, um das Knowledge Impediment loszuwerden. Hierzu sind mehrere Sprints notwendig, da Muster, die sich über die Zeit aufgebaut haben, auch eine bestimmte Zeit brauchen, um wieder abgebaut zu werden.<o:p></o:p></p>
        <p>In einem Sprint solltet ihr nur die Aktionen (Action Items) einplanen, die ihr wirklich für umsetzbar haltet. Macht euch im Team klar, welche Kapazitäten jedes Teammitglied hat und wie diese für das Verlernen zum Einsatz kommen sollen. So könnt ihr euch über mehrere Sprints und Abarbeiten mehrerer Action Items von einem Knowledge Impediment lösen.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie zerlegen wir am besten unseren Plan aus der Vorbereitung in handhabbare Schritte (Action Items)?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Action Items nehmen wir im aktuellen Sprint rein?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Measuring Unlearning <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Um festzustellen, ob ihr Fortschritte im Verlernen macht, müsst ihr messen. Dazu könnt ihr euch im Team an eurer Definition of Unlearning (DoU) orientieren und prüfen, ob ihr alle von euch in der Planung festgelegten Action Items durchgeführt habt und das Knowledge Impediment beseitigt wurde.<o:p></o:p></p>
        <p>Konkret solltet ihr dazu immer festhalten und tracken, wie viele Action Items ihr für eine bestimmte Anzahl an Knowledge Impediments aktuell im Verlernprozess sind. Dadurch erhaltet ihr die Kennzahl des Unlearning-in-Progress (UiP) ähnlich zum work-in-progress (WiP), d. h. Anzahl von Stories die aktuell in Bearbeitung sind. Damit ihr im Team zusätzlich zur Arbeit am Produkt nicht in Stress durch Verlernen geratet, müsst ihr herausfinden, wo euer UiP-Limit liegt. Erkundet für euch und euer Team, ob ihr lieber nur ein Knowledge Impediment angeht oder parallel mehrere. Bei mehreren empfiehlt sich eine Kennzeichnung mittels geeigneter Codes (Textkürzel, Farben, etc.).</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie viele verschiedene Knowledge Impediments sind aktuell im Verlernprozess?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie viele verschiedene Action-Items haben wir aktuell im Verlernprozess?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie lange befinden sich die Action-Items bereits im Verlernprozess?<o:p></o:p></span></li>
        </ul>`,

    `<p class="MsoNormal" style="font-weight: bold">Feedback <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Verlernen ist wie SCRUM ein kontinuierlicher Prozess und wandelt sich. Hierzu ist Feedback hilfreich aus dem Team für das Team. Das Feedback kann sich sowohl auf bestehende Knowledge Impediments und deren Verlernprozess beziehen, als auch auf neue, die im Verlauf des letzten Sprints erkannt wurden. Das Feedback kann dann als Input für ein neues Brainstorming dienen.<o:p></o:p></p>
        <p>Konkret kann das Team also nach dem Sprint wieder zusammenkommen und im Rahmen einer Retrospektive gemeinsam den Fortschritt bestehender Action Items bewerten und die gewonnenen Erkenntnisse dann in die nächste Iteration einfließen lassen. Ebenso kann über den Verlernprozess per se reflektiert werden und weitere Verbesserungen geplant werden.</p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wo hat das Verlernen von Knowledge Impediments gut geklappt und Action Items können als ‚done‘ gekennzeichnet werden? Wo nicht und warum?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche weiteren, neuen Knowledge Impediments sind möglicherweise seit dem letzten Sprint aufgetaucht?<o:p></o:p></span></li>
        </ul>`
];
let key;

function createList(listInputId, addBtnId, listId,  canvasBoxId, data, boardKey) {

    const listInput = document.getElementById(listInputId);
    const addToListBtn = document.getElementById(addBtnId);
    const list = document.getElementById(listId);

    if (data.length !== 0) {
        data.forEach((element) => {
            let createdItem = addNewItem(element, list);
            addEditDeleteListener(createdItem, canvasBoxId, boardKey);
        });
    }
    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            addToListBtn.click();
            if (listInput.value.trim() === '') {
                listInput.blur();
            }
        }
    };
    listInput.addEventListener('keypress', handleKeypress);

    addToListBtn.addEventListener('click', function () {
        const newItemText = listInput.value.trim();
        if (newItemText !== '') {
            addToListBtn.disable = true;
            insertData(newItemText, canvasBoxId, boardKey)
                .then(responseData => {
                    let createdItem = addNewItem(JSON.parse(responseData), list);
                    listInput.value = '';
                    addEditDeleteListener(createdItem, canvasBoxId);
                    addToListBtn.disable = false;
                    onClick(key);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });

    const infoBtns = document.querySelectorAll('.infoBtn');
    if (infoBtns) {
        infoBtns.forEach((element) => {
            element.addEventListener('click', () => {
                const num = parseInt(element.id.split('-')[1]); // Extract the number after the hyphen
                const modal = document.getElementById("myModal");
                const span = document.getElementsByClassName("close")[0];
                const modalContent = document.querySelector(".modal-content p");
                modalContent.innerHTML = informations[num];

                element.onclick = () => {
                    modal.style.display = "block";
                }


                span.onclick = () => {
                    modal.style.display = "none";
                }

                window.onclick = (event) => {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            });
        })
    }
}

function addNewItem(element, list) {
    const newItem = document.createElement('li');
    const span = document.createElement('span');
    const hiddenInput = document.createElement('input'); // Create hidden input
    hiddenInput.type = 'hidden'; // Set input type to hidden
    hiddenInput.name = 'item-id'; // Set a name for identification if needed
    hiddenInput.value = element.id; // Set the value to the item ID
    span.textContent = element.description;
    newItem.appendChild(span);
    newItem.appendChild(hiddenInput); // Append hidden input to the list item
    list.appendChild(newItem);

    return newItem;
}

function addEditDeleteListener(item, canvasBoxId, boardKey) {
    item.addEventListener('click', (event) => {
        const target = event.target;


        if (target.tagName === 'SPAN') {
            const spanText = target.textContent;
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = spanText;
            inputField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const newText = inputField.value.trim();
                    const hiddenInput = item.querySelector('input[type="hidden"]');
                    const itemId = hiddenInput.value;
                    if (newText !== '') {
                        const newSpan = document.createElement('span');
                        newSpan.textContent = newText;
                        item.replaceChild(newSpan, inputField);
                        // Update data on the server
                        updateData(newText, canvasBoxId, itemId, boardKey)
                            .then(() => {
                                onClick(key); // Notify websocket
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    } else {
                        item.parentNode.removeChild(item); // Remove the whole list item
                        deleteData(itemId)
                            .then(() => {
                                onClick(key); // Notify websocket
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    }
                    inputField.blur(); // Unfocus the input field
                } else if (e.key === 'Escape') {
                    item.removeChild(inputField);
                }
            });
            item.replaceChild(inputField, target);
            inputField.focus();
        }
    });
}

function refresh(boardKey) {
    if (boardKey === key) {
        getData(boardKey, (responseText) => {
            const fetchedData = JSON.parse(responseText);
            const listIds = ['', 'knowledgeList', 'targetingPrioritizationList', 'teamReflexionList', 'sharedPerspectiveList', 'unlearningVisionList', 'definitionOfUnlearnedList', 'interventionPlanningList', 'actionItemsList', 'measuringUnlearningItemsList', 'feedbackList'];

            listIds.forEach((listId) => {
                let data = fetchedData.filter((item) => item.canvasBox === listIds.indexOf(listId));
                const list = document.getElementById(listId);
                let existingItems = list ? list.getElementsByTagName('li') : [];

                // Update existing items and remove items not present in fetched data
                Array.from(existingItems).forEach(item => {
                    let input = item.querySelector('input');
                    let span = item.querySelector('span');
                    let matchingData = data.find(element => input.value === element.id.toString());

                    if (matchingData) {
                        if (input.value === matchingData.id.toString()) {
                            if (span.textContent !== matchingData.description) {
                                span.textContent = matchingData.description; // Update description
                            }
                        }
                    } else {
                        // Remove the item if not present in fetched data
                        item.remove();
                    }
                });
                // Add new items from fetched data
                data.forEach(element => {
                    let isItemInList = Array.from(existingItems).some(item => {
                        let input = item.querySelector('input');
                        return input.value === element.id.toString();
                    });

                    if (!isItemInList) {
                        let createdItem = addNewItem(element, list);
                        addEditDeleteListener(createdItem, listIds.indexOf(listId));
                    }
                });
            });
        });
    }
}
function load(boardData, boardKey) {
    key=boardKey;
    if (typeof boardData === 'undefined' || boardData === null || boardData.length === 0) {
        boardData=[];
        callCreatLists(boardData,boardKey);
    }
    else{
        callCreatLists(boardData,boardKey);
    }
}
function callCreatLists(boardData, boardKey){
    createList('knowledgelistInput', 'knowledgeToListBtn', 'knowledgeList',
        1, boardData.filter((item) => item.canvasBox === 1), boardKey);
    createList('targetingPrioritizationInput', 'targetingPrioritizationBtn', 'targetingPrioritizationList',
        2, boardData.filter((item) => item.canvasBox === 2), boardKey);
    createList('teamReflexionListInput', 'teamReflexionListBtn', 'teamReflexionList',
        3, boardData.filter((item) => item.canvasBox === 3), boardKey);
    createList('sharedPerspectiveListInput', 'sharedPerspectiveListBtn', 'sharedPerspectiveList',
        4, boardData.filter((item) => item.canvasBox === 4), boardKey);
    createList('unlearningVisionListInput', 'unlearningVisionListBtn', 'unlearningVisionList',
        5, boardData.filter((item) => item.canvasBox === 5), boardKey);
    createList('definitionOfUnlearnedListInput', 'definitionOfUnlearnedListBtn', 'definitionOfUnlearnedList',
        6, boardData.filter((item) => item.canvasBox === 6), boardKey);
    createList('interventionPlanningListInput', 'interventionPlanningListBtn', 'interventionPlanningList',
        7, boardData.filter((item) => item.canvasBox === 7), boardKey);
    createList('actionItemsListInput', 'actionItemsListBtn', 'actionItemsList',
        8, boardData.filter((item) => item.canvasBox === 8), boardKey);
    createList('measuringUnlearningListInput', 'measuringUnlearningListBtn', 'measuringUnlearningItemsList',
        9, boardData.filter((item) => item.canvasBox === 9), boardKey);
    createList('feedbackListInput', 'feedbackListBtn', 'feedbackList',
        10, boardData.filter((item) => item.canvasBox === 10), boardKey);
}

export {refresh, load};