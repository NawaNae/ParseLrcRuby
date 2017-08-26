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
        nowi = 0;//處理指標
        finalKanji = LrcStr.indexOf(Sign1) - 1;//左括弧前第一個字為最後一個漢字
        ans += LrcStr.substring(nowi, getKanjiFirstIndex(LrcStr, finalKanji));//從處理指標往後到第一個漢字之前
        nowi = getKanjiFirstIndex(LrcStr, finalKanji);
        ans += "<ruby><rb>";
        ans += LrcStr.substring(nowi, finalKanji + 1);//漢字串
        ans += "</rb><rp>" + Sign1 + "</rp><rt>";
        nowi = finalKanji + 2;//括號後1字(注音第一字)
        finalRubyText = LrcStr.indexOf(Sign2) - 1;//後括號前1字(注音末字)
        ans += LrcStr.substring(nowi, finalRubyText + 1);//串入
        ans += "</rt><rp>" + Sign2 + "</rp></ruby>";
        LrcStr = LrcStr.substring(finalRubyText+2, LrcStr.length);//將前端字串移除
    }
    ans += LrcStr;
    ans += "</pre>"; LrcStr = LrcStr.replace(/\n/, "<br>");
    return ans;
}
function judgeNotKanJi(chr)//找平假名OR片假名
{
    return ('ぁ' <= chr && chr <= 'ゟ') || ('゠' <= chr && chr <= 'ㇿ') || chr == ' ' || chr == '　' || chr == ',' || chr == '.' || chr == '。' || chr == '，' || chr == '\n'; 
}
function getKanjiFirstIndex(LrcStr, index)//從最後一個漢字找到第一個漢字
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