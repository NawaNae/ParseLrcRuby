String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};
function parseLrc(LrcStr, Sign1, Sign2) {
    var ans = "";
    var nowi = 0;
    ans = "<pre class='lrc'>";
    var finalKanji;
    var finalRubyText;
    while (LrcStr.indexOf(Sign1) != -1) {
        nowi = 0;
        finalKanji = LrcStr.indexOf(Sign1) - 1;
        ans += LrcStr.substring(nowi, getKanjiStrBeforeFirstIndex(LrcStr, finalKanji));
        nowi = getKanjiStrBeforeFirstIndex(LrcStr, finalKanji);
        ans += "<ruby><rb>";
        ans += LrcStr.substring(nowi, finalKanji + 1);
        ans += "</rb><rp>" + Sign1 + "</rp><rt>";
        nowi = finalKanji + 2;
        finalRubyText = LrcStr.indexOf(Sign2) - 1;
        ans += LrcStr.substring(nowi, finalRubyText + 1);
        ans += "</rt><rp>" + Sign2 + "</rp></ruby>";
        LrcStr = LrcStr.substring(finalRubyText+2, LrcStr.length);
    }
    ans += LrcStr;
    ans += "</pre>";
    return ans;
}
function judgeNotKanJi(chr)//找平假名OR片假名
{
    return ('ぁ' <= chr && chr <= 'ゟ') || ('゠' <= chr && chr <= 'ㇿ'); 
}
function getKanjiStrBeforeFirstIndex(LrcStr, index)
{
    for (; index >= 0; index--)
    {
     //   alert(LrcStr[index] + judgeNotKanJi(LrcStr[index]) + "\n");
        if (judgeNotKanJi(LrcStr[index]))
            break;
    }

    index++;
    return index;
}
function getKanjiStrBefore(LrcStr, index)
{
    var last = index;
    index = getKanjiStrBeforeFirstIndex(LrcStr, index);
    return LrcStr.substring(index, last);
}