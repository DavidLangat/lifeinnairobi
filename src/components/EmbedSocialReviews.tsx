'use client';

import React, { useEffect } from 'react';

const EmbedSocialReviews = () => {
    useEffect(() => {
        (function (d, s, id) {
            var js;
            if (d.getElementById(id)) { return; }
            js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = "https://embedsocial.com/cdn/ht.js";
            d.getElementsByTagName("head")[0].appendChild(js);
        }(document, "script", "EmbedSocialHashtagScript"));
    }, []);

    return (
        <div className="embedsocial-hashtag" data-ref="6b78ae84160b5e875aaecbf1db00caba91765249">

        </div>
    );
};

export default EmbedSocialReviews;
