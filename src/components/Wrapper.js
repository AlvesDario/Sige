import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import English from '../languages/en-US.json';
import Portuguese from '../languages/pt-BR.json';
import Spanish from '../languages/es-CL.json'

export const Context = React.createContext();

const local = "pt-BR";

let lang;

if (local === "en-US") {
    lang = English;
} else if (local === "pt-BR") {
    lang = Portuguese;
} else if (local === 'es-CL'){
    lang = Spanish;
}

const Wrapper = (props) => {
    const [locale, setLocale] = useState(local);
    const [messages, setMessages] = useState(lang);

    function selectLang(e) {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (newLocale === 'en-US'){
            setMessages(English);
        } else if (newLocale === 'pt-BR') {
            setMessages(Portuguese);
        } else if (newLocale === 'es-CL'){
            setMessages(Spanish);
        }
    }

    return(
        <Context.Provider value={{ locale, selectLang }}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
        
    );
}

export default Wrapper;