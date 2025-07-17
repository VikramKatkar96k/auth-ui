import React, { useEffect, useState } from "react";

export default function ResidencyDeclarationGovFormat() {
  const [data, setData] = useState({
    name: "________",
    age: "________",
    beneficiaryType: "________",
    village: "________",
    taluka: "________",
    district: "________",
    tehsil: "________",
    place: "________",
    date: "________",
    signature: "________",
     childName: "________",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const getValue = (key: string) => params.get(key) || "________";

    const subValue = getValue("sub");
    const nameValue = getValue("name");

    setData({
      name: nameValue,
      age: getValue("age"),
      beneficiaryType: getValue("beneficiaryType"),
      village: getValue("village"),
      taluka: subValue,
      district: getValue("district"),
      childName: getValue("childName"),
      tehsil: subValue,
      place: subValue,
      date: new Date().toLocaleDateString("en-IN"),
      signature: getValue("signature"),
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-[Kruti Dev 010] print:p-0 print:shadow-none">
      <button
        onClick={() => window.print()}
        className="mb-6 px-4 py-2 bg-gray-800 text-white rounded print:hidden"
      >
        🖨️ प्रिंट करा
      </button>

      <div className="border-2 border-gray-700 p-6 leading-[3rem] text-lg">
        <h1 className="text-center text-2xl font-bold border border-gray-700 rounded-full px-6 py-1 w-fit mx-auto mb-8">
          रहिवाशी प्रमाणपत्राबाबत स्वयं घोषणापत्र
        </h1>

        <span className="leading-[2.2rem] inline-block text-justify mb-10">

          मी नामे <strong>{data.name}</strong>, वय <strong>{data.age}</strong>, धंदा{" "}
          <strong>{data.beneficiaryType}</strong>, रा.{" "}
          <strong>{data.village}</strong>, ता. <strong>{data.taluka}</strong>, जि.{" "}
          <strong>{data.district}</strong> येथील रहिवाशी असून, स्वयं घोषणापत्र
          लिहून देतो की, मला / स्वत: / माझा मुलगा / माझी मुलगी नावे{" "}
          <strong>{data.childName}</strong>, मी वरील ठिकाणाचा कायमचा रहिवाशी आहे.
          मला तहसील कार्यालय <strong>{data.tehsil}</strong> येथून रहिवाशी प्रमाणपत्र
          काढायचे आहे. तरी मी घोषणा करतो की, मी व माझ्या कुटुंबातील सर्व सदस्य
          वरील ठिकाणाचे कायमचे रहिवाशी आहेत.
          <br></br>
          <span className="inline-block pl-[4.5rem] leading-[2.2rem]"></span> करिता मी हे स्वयंघोषणापत्र लिहून देत आहे. वरील सर्व माहिती माझ्या
          व्यक्तिगत माहिती व समजुतीनुसार खरी आहे. सदर माहिती खोटी आढळून
          आल्यास, भारतीय दंड संहिता १९६० चे कलम १९९ व २०० व अन्य संबंधित कायद्यानुसार
          माझ्यावर खटला भरला जाईल व त्यानुसार मी शिक्षेस पात्र राहील, याची मला
          पूर्ण जाणीव आहे.
    </span>
        <div className="flex justify-between mt-12">
          <div>
            ठिकाण: <strong>{data.place}</strong>
            <br />
            दिनांक: <strong>{data.date}</strong>
          </div>
          <div className="text-right">
            अर्जदाराची स्वाक्षरी: <strong>{data.signature}</strong>
            <br />
            अर्जदाराचे नाव: <strong>{data.name}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
