function runDay4(input) {
    input = input.replaceAll("\r", "");
    input = input.split("\n\n").map(passport => passport.replaceAll("\n", " "));

    const res1 = runP1();
    const res2 = runP2();
    showAlert("success", "Result - p1: " + res1 + "<br>Result - p2: " + res2);

    function runP1() {
        let res = 0;

        input.forEach(passport => {
            if (isValid(passport)) res++;
        });

        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() {          
          let res = 0;

          input.forEach(passport => {
              if (isValid(passport)) {
                const fields = passport.split(" ");
                const codes = {
                    byr: parseInt(fields.find(field => field.includes("byr")).substr(4), 10) || 0,
                    iyr: parseInt(fields.find(field => field.includes("iyr")).substr(4), 10) || 0,
                    eyr: parseInt(fields.find(field => field.includes("eyr")).substr(4), 10) || 0,
                    hgt: fields.find(field => field.includes("hgt")).substr(4),
                    hcl: fields.find(field => field.includes("hcl")).substr(4),
                    ecl: fields.find(field => field.includes("ecl")).substr(4),
                    pid: fields.find(field => field.includes("pid")).substr(4)
                };

                let valid = true;
                for (const key of Object.keys(codes)) {
                    if (!isVerified(key, codes[key])) {
                        valid = false;
                        break;
                    }
                }

                if (valid) res++;
              }
          });

        console.log("Result - p2: " + res);
        return res;
    }

    function isValid(passport) {
        const fields = passport.split(" ");
        return fields.length >= 7 && (fields.length === 7 ? !passport.includes("cid") : true);
    }

    function isVerified(code, field) {
        switch (code) {
            case "byr":
                return field >= 1920 && field <= 2002;

            case "iyr":
                return field >= 2010 && field <= 2020;

            case "eyr":
                return field >= 2020 && field <= 2030;

            case "hgt":
                if (!field.match(/^\d+(cm|in)$/g)) return false;
                const num = parseInt(field.substring(0, field.length - 2), 10);
                if (field.includes("cm")) return num >= 150 && num <= 193;
                else if (field.includes("in")) return num >= 59 && num <= 76;

            case "hcl":
                return !!field.match(/^#(\d|[a-f]){6}/gi);

            case "ecl":
                const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
                return colors.includes(field);

            case "pid":
                return !!field.match(/^\d{9}$/g);

            default:
                return false;
        }
    }
}