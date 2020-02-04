(function(){
    // build footer scenes
    $(function () { // wait for document ready

    	// var scene0 = new ScrollMagic.Scene({triggerElement: ".footer", offset: 0, duration: 530})
     //        .setClassToggle("#footerText", "show") // show footer text
     //        .addIndicators({name: "show footer title"})
     //        .addTo(controller);

     //    var scene1 = new ScrollMagic.Scene({triggerElement: ".footer", offset: 0, duration: 530})
     //        .setClassToggle("#container", "show") // show footer container div
     //        .addIndicators({name: "show container div"})
     //        .addTo(controller);
     
    // remove previously added indicators - uncomment when done
    // scene0.removeIndicators();
    // scene1.removeIndicators();

    });


    /////////////////////////////////////////////////////////////////////////

    // FOOTER ///////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////

    // footer headline
    var footerDiv = d3.select(".footer"),
        footerText = footerDiv.append("div")
            .attr("class", "col-xs-12 col-sm-12 col-md-12")
            .attr("id", "footerText")
            .style("margin-top", "100px")
            .style("color", "white")
            .style("font-weight", 300);

    var text_large = "Read Full Report",
        text_small = "Learn more on PM2.5 in NYC<br />\
            <a href='http://ehjournal.biomedcentral.com/articles/10.1186/s12940-016-0172-6' target='_blank'>go to report</a>",
        text_large2 = "Get In Touch",
        text_small2 = "We'd love to hear from you!<br />\
            <a href='mailto:nyccas@health.nyc.gov?Subject=Type%20your%20subject' target='_blank'>email us</a>";
            
    var footertitle = footerText.append("h1").text(text_large),
        footertext = footerText.append("h4").html(text_small),
        footertitle2 = footerText.append("h1").html(text_large2).style("margin-top", "100px"),
        footertext2 = footerText.append("h4").html(text_small2);

    // footer div container 
    var container = footerDiv.append("div")
        .attr("id", "container")
        .attr("class", "container")
    
    var resources = container
        .append("div")
        .attr("class", "col-xs-12 col-md-12")
        .append("ul")
        .append("li")
        .attr("class", "footerList")
        // .html("<h4>Resources</h4>")
        .append("text").html("<li><a href='https://www1.nyc.gov/site/doh/data/data-publications/air-quality-nyc-community-air-survey.page' target='_blank'>NYC Community Air Survey</a></li>")
        .append("text").html("<li><a href='http://a816-dohbesp.nyc.gov/IndicatorPublic/' target='_blank'>NYC Environment And Health Data Portal</a></li>")
        .append("text").html("<li><a href='http://www1.nyc.gov/html/onenyc/index.html' target='_blank'> OneNYC</a></li>")
        .append("text").html("<li><a href='https://www3.epa.gov/airquality/particlepollution/designations/basicinfo.htm' target='_blank'>US EPA</a></li>")
        .append("text").html("<li><a href='http://www.dec.ny.gov/airmon/' target='_blank'>DEC Air Monitoring</a></li>")
        .append("text").html("<li><a href='http://www1.nyc.gov/site/doh/health/health-topics/asthma.page' target='_blank'>NYC DOHMH Asthma topic page</a></li>")
        ;

    var social = container
        .append("div")
        .attr("class", "col-xs-12 col-md-12")
        .append("text").html("SHARE: ")
       // .append("text").html("<a class='btn btn-social-icon btn-google-plus' href='http://google.com/+'><i class='fa fa-google-plus'></i></a>")
        .append("text").html("<a class='btn btn-social-icon' href='http://www.facebook.com/share.php?u=http://a816-dohbesp.nyc.gov/IndicatorPublic/traffic'><i class='fab fa-facebook'></i></a>")
        .append("text").html("<a class='btn btn-social-icon btn-linkedin' href='http://www.linkedin.com/shareArticle?mini=true&url=http://a816-dohbesp.nyc.gov/IndicatorPublic/Traffic&title=Traffic%20in%20NYC' ><i class='fab fa-linkedin'></i></a>")
        .append("text").html("<a class='btn btn-social-icon btn-twitter' href='https://publish.twitter.com/oembed?url=http://a816-dohbesp.nyc.gov/IndicatorPublic/traffic'><i class='fab fa-twitter'></i></a>")
        .append("text").html("<a class='btn btn-social-icon' href='mailto:?body=http://a816-dohbesp.nyc.gov/IndicatorPublic/Traffic'><i class='fa fa-envelope-o'></i></a>")
        ;

   // <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http://a816-dohbesp.nyc.gov/IndicatorPublic/Traffic&amp;title=Traffic" target="_blank" style="color: white;" aria-label="LinkedIn Link">LinkedIn </a>


 })();


