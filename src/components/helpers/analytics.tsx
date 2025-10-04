"use client";

import Script from "next/script";

import { configData } from "@/data/config";

export function Analytics() {
  const {
    googleAnalytics,
    simpleAnalytics,
    plausible,
    umami,
    matomo,
    microsoftClarity,
    mixpanel,
  } = configData.analytics;

  return (
    <>
      {/* Google Analytics */}
      {googleAnalytics?.measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalytics.measurementId}');
            `}
          </Script>
        </>
      )}

      {/* Simple Analytics */}
      {simpleAnalytics?.hostname && (
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
          data-hostname={simpleAnalytics.hostname}
        />
      )}

      {/* Plausible Analytics */}
      {plausible?.domain && (
        <Script
          src={plausible.src || "https://plausible.io/js/script.js"}
          strategy="afterInteractive"
          data-domain={plausible.domain}
        />
      )}

      {/* Umami Analytics */}
      {umami?.websiteId && (
        <Script
          src={umami.src || "https://analytics.umami.is/script.js"}
          strategy="afterInteractive"
          data-website-id={umami.websiteId}
        />
      )}

      {/* Matomo Analytics */}
      {matomo?.url && matomo?.siteId && (
        <Script id="matomo-analytics" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="${matomo.url}";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '${matomo.siteId}']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {microsoftClarity?.projectId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarity.projectId}");
          `}
        </Script>
      )}

      {/* Mixpanel */}
      {mixpanel?.token && (
        <Script id="mixpanel-analytics" strategy="afterInteractive">
          {`
            (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
            mixpanel.init("${mixpanel.token}");
            mixpanel.track("Page View");
          `}
        </Script>
      )}
    </>
  );
}
