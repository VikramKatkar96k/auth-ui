import React, { useState, useEffect } from "react";
import { ArrowLeft, FileText, User, MapPin, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import districtsData from "../data/districts.json";
import api from "@/lib/axios";

export default function SetuForm() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submittedDocuments, setSubmittedDocuments] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    district: "",
    sub: "",
    village: "",
    beneficiaryType: "",
    childName: "स्वत:",
    valueChild: "",
    caste: "",       
    Religion: "",      
  });

  const [checkboxes, setCheckboxes] = useState({
    casteCheckbox: false,
    incomeCheckbox: false,
    Residency: false,
    vivah: false,
    alp: false,
    farmer: false,
  });

  const [talukaList, setTalukaList] = useState([]);
  const [villageList, setVillageList] = useState([]);

  // Initialize default dropdown values
  useEffect(() => {
    const defaultDistrict = districtsData[0];
    const defaultTaluka = defaultDistrict.subdistricts[0];
    const defaultVillage = defaultTaluka.villages[0];

    setForm(prev => ({
      ...prev,
      district: defaultDistrict.name,
      sub: defaultTaluka.name,
      village: defaultVillage
    }));

    setTalukaList(defaultDistrict.subdistricts);
    setVillageList(defaultTaluka.villages);
  }, []);

  const handleDistrictChange = (selectedDistrict: string) => {
    const district = districtsData.find(d => d.name === selectedDistrict);
    const talukas = district?.subdistricts || [];
    const villages = talukas[0]?.villages || [];

    setForm(prev => ({
      ...prev,
      district: selectedDistrict,
      sub: talukas[0]?.name || "",
      village: villages[0] || ""
    }));

    setTalukaList(talukas);
    setVillageList(villages);
  };

  const handleTalukaChange = (selectedTaluka: string) => {
    const taluka = talukaList.find((t: any) => t.name === selectedTaluka);
    const villages = taluka?.villages || [];

    setForm(prev => ({
      ...prev,
      sub: selectedTaluka,
      village: villages[0] || ""
    }));

    setVillageList(villages);
  };

  const handleVillageChange = (selectedVillage: string) => {
    setForm(prev => ({ ...prev, village: selectedVillage }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckboxes(prev => ({ ...prev, [id]: checked }));
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const required = ["name", "age", "village", "sub", "district", "beneficiaryType"];
    for (let key of required) {
      if (!form[key as keyof typeof form]) {
        setError("सर्व फील्ड अनिवार्य आहेत!");
        return;
      }
    }

    if (checkboxes.casteCheckbox && (!form.caste || !form.Religion)) {
      setError("कृपया जात आणि धर्म लिहा!");
      return;
    }

    let finalChild = form.childName;
    if (["मुलगा", "मुलगी"].includes(form.childName) && form.valueChild) {
      finalChild = `${form.childName} - ${form.valueChild}`;
    }

    const selectedDocuments = Object.entries(checkboxes)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    const dataToSend = {
      ...form,
      childName: finalChild,
      selectedDocuments,
    };

    try {
      const response = await api.post("/api/forms/setu", dataToSend);
      setSuccess("✅ फॉर्म यशस्वीरित्या सबमिट झाला आहे!");
      setError("");

      // Prepare query parameters for document generation
      const queryObj: Record<string, string> = {
        ...form,
        childName: finalChild,
        selectedDocuments: selectedDocuments.join(","),
      };

      const query = new URLSearchParams(queryObj).toString();
      setSubmittedDocuments(selectedDocuments);
      setQueryParams(query);

      // Reset form after successful submission
      setForm({
        name: "",
        age: "",
        district: "",
        sub: "",
        village: "",
        beneficiaryType: "",
        childName: "स्वत:",
        valueChild: "",
        caste: "",
        Religion: "",
      });
      
      setCheckboxes({
        casteCheckbox: false,
        incomeCheckbox: false,
        Residency: false,
        vivah: false,
        alp: false,
        farmer: false,
      });

      setTimeout(() => {
        setSuccess("");
        setSubmittedDocuments([]);
        setQueryParams("");
      }, 10000);

    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Unknown error";
      setError(message);
      setSuccess("");
      setTimeout(() => setError(""), 4000);
    }
  };

  const checkboxOptions = [
    { id: "casteCheckbox", label: "जात", icon: User },
    { id: "Residency", label: "रहिवासी", icon: MapPin },
    { id: "incomeCheckbox", label: "उत्पन्न", icon: Briefcase },
    { id: "vivah", label: "विवाह शपथपत्र", icon: Users },
    { id: "alp", label: "अल्पभूधारक शपथपत्र", icon: FileText },
    { id: "farmer", label: "शेतकरी शपथपत्र", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2 hover:bg-blue-50 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            मागे जा
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">फॉर्म भरा</h1>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-center text-xl font-semibold flex items-center justify-center gap-2">
              <FileText className="h-6 w-6" />
              📝 प्रमाणपत्राबाबत स्वयं घोषणापत्र
            </CardTitle>
          </CardHeader>

          {/* Success Toast with Document Links */}
          {success && submittedDocuments.length > 0 && (
            <div className="m-6 p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-center text-green-700 font-semibold mb-4">{success}</div>
              <div className="space-y-4">
                <h2 className="text-center text-lg font-semibold text-green-700">📝 उघडण्यासाठी दस्तऐवज:</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {submittedDocuments.map((id) => {
                    const fileMap: Record<string, string> = {
                      casteCheckbox: "./CasteDeclaration",
                      Residency: "./ResidencyDeclarationGovFormat",
                      incomeCheckbox: "income.html",
                      vivah: "vivah.html",
                      alp: "alp.html",
                      farmer: "farmer.html",
                    };
                    const labelMap: Record<string, string> = {
                      casteCheckbox: "जात शपथपत्र",
                      Residency: "रहिवासी",
                      incomeCheckbox: "उत्पन्न",
                      vivah: "विवाह शपथपत्र",
                      alp: "अल्पभूधारक",
                      farmer: "शेतकरी शपथपत्र",
                    };
                    const url = fileMap[id];
                    const label = labelMap[id];

                    return (
                      <Button
                        key={id}
                        variant="outline"
                        className="bg-white border-blue-500 text-blue-600 hover:bg-blue-100"
                        onClick={() => window.open(`${url}?${queryParams}`, "_blank")}
                      >
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Error Toast */}
          {error && (
            <div className="fixed top-6 right-6 z-50">
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-lg animate-slide-in">
                <strong className="font-bold">⚠️ त्रुटी: </strong>
                <span className="block">{error}</span>
              </div>
            </div>
          )}

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    नाव *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="तुमचे पूर्ण नाव लिहा"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                    वय *
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="तुमचे वय लिहा"
                  />
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">स्थान माहिती</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">जिल्हा *</Label>
                    <Select value={form.district} onValueChange={handleDistrictChange}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="जिल्हा निवडा" />
                      </SelectTrigger>
                      <SelectContent>
                        {districtsData.map((d, i) => (
                          <SelectItem key={i} value={d.name}>{d.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">तालुका *</Label>
                    <Select value={form.sub} onValueChange={handleTalukaChange}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="तालुका निवडा" />
                      </SelectTrigger>
                      <SelectContent>
                        {talukaList.map((t: any, i) => (
                          <SelectItem key={i} value={t.name}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">गाव *</Label>
                    <Select value={form.village} onValueChange={handleVillageChange}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="गाव निवडा" />
                      </SelectTrigger>
                      <SelectContent>
                        {villageList.map((v, i) => (
                          <SelectItem key={i} value={v}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Occupation & Beneficiary Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    व्यवसाय *
                  </Label>
                  <Select value={form.beneficiaryType} onValueChange={(value) => handleSelectChange("beneficiaryType", value)}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="व्यवसाय निवडा" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="विद्यार्थी">विद्यार्थी</SelectItem>
                      <SelectItem value="शेतकरी">शेतकरी</SelectItem>
                      <SelectItem value="कामगार">कामगार</SelectItem>
                      <SelectItem value="मोलमजूरी">मोलमजूरी</SelectItem>
                      <SelectItem value="उद्योग">उद्योग</SelectItem>
                      <SelectItem value="गृहिणी">गृहिणी</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    लाभार्थी
                  </Label>
                  <Select value={form.childName} onValueChange={(value) => handleSelectChange("childName", value)}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="स्वत:">स्वत:</SelectItem>
                      <SelectItem value="मुलगा">मुलगा</SelectItem>
                      <SelectItem value="मुलगी">मुलगी</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Child Name Field (Conditional) */}
              {["मुलगा", "मुलगी"].includes(form.childName) && (
                <div className="space-y-2">
                  <Label htmlFor="valueChild" className="text-sm font-semibold text-gray-700">
                    लाभार्थी चे नाव *
                  </Label>
                  <Input
                    id="valueChild"
                    name="valueChild"
                    value={form.valueChild}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="लाभार्थी चे पूर्ण नाव लिहा"
                  />
                </div>
              )}

              {/* Document Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  आवश्यक कागदपत्रे निवडा
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {checkboxOptions.map(({ id, label, icon: Icon }) => (
                    <div key={id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
                      <Checkbox
                        id={id}
                        checked={checkboxes[id as keyof typeof checkboxes]}
                        onCheckedChange={(checked) => handleCheckboxChange(id, !!checked)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label
                        htmlFor={id}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        <Icon className="h-4 w-4 text-blue-600" />
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditional Caste and Religion Fields */}
              {checkboxes.casteCheckbox && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="caste" className="text-sm font-semibold text-gray-700">
                      जात *
                    </Label>
                    <Input
                      id="caste"
                      name="caste"
                      value={form.caste}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      placeholder="जात लिहा"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      धर्म *
                    </Label>
                    <Select value={form.Religion} onValueChange={(value) => handleSelectChange("Religion", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="धर्म निवडा" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="हिंदू">हिंदू</SelectItem>
                        <SelectItem value="बौद्ध">बौद्ध</SelectItem>
                        <SelectItem value="ख्रिश्चन">ख्रिश्चन</SelectItem>
                        <SelectItem value="जैन">जैन</SelectItem>
                        <SelectItem value="मुस्लिम">मुस्लिम</SelectItem>
                        <SelectItem value="शीख">शीख</SelectItem>
                        <SelectItem value="पारशी">पारशी (झोराष्ट्रियन)</SelectItem>
                        <SelectItem value="इतर">इतर</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-12 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  सबमिट करा
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}