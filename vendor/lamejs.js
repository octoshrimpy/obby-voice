var lamejs = (() => {
  // node_modules/lamejs/lame.min.js
  function lamejs() {
    function X(c2) {
      return new Int32Array(c2);
    }
    function K(c2) {
      return new Float32Array(c2);
    }
    function ca(c2) {
      if (1 == c2.length) return K(c2[0]);
      var k = c2[0];
      c2 = c2.slice(1);
      for (var n = [], u = 0; u < k; u++) n.push(ca(c2));
      return n;
    }
    function Ia(c2) {
      if (1 == c2.length) return X(c2[0]);
      var k = c2[0];
      c2 = c2.slice(1);
      for (var n = [], u = 0; u < k; u++) n.push(Ia(c2));
      return n;
    }
    function dc(c2) {
      if (1 == c2.length) return new Int16Array(c2[0]);
      var k = c2[0];
      c2 = c2.slice(1);
      for (var n = [], u = 0; u < k; u++) n.push(dc(c2));
      return n;
    }
    function Ob(c2) {
      if (1 == c2.length) return Array(c2[0]);
      var k = c2[0];
      c2 = c2.slice(1);
      for (var n = [], u = 0; u < k; u++) n.push(Ob(c2));
      return n;
    }
    function ra(c2) {
      this.ordinal = c2;
    }
    function G(c2) {
      this.ordinal = c2;
    }
    function la(c2) {
      this.ordinal = function() {
        return c2;
      };
    }
    function mc() {
      this.getLameVersion = function() {
        return "3.98.4";
      };
      this.getLameShortVersion = function() {
        return "3.98.4";
      };
      this.getLameVeryShortVersion = function() {
        return "LAME3.98r";
      };
      this.getPsyVersion = function() {
        return "0.93";
      };
      this.getLameUrl = function() {
        return "http://www.mp3dev.org/";
      };
      this.getLameOsBitness = function() {
        return "32bits";
      };
    }
    function Y() {
      function c2(f, b, c3, a, m, k2) {
        for (; 0 != m--; ) c3[a] = 1e-10 + f[b + 0] * k2[0] - c3[a - 1] * k2[1] + f[b - 1] * k2[2] - c3[a - 2] * k2[3] + f[b - 2] * k2[4] - c3[a - 3] * k2[5] + f[b - 3] * k2[6] - c3[a - 4] * k2[7] + f[b - 4] * k2[8] - c3[a - 5] * k2[9] + f[b - 5] * k2[10] - c3[a - 6] * k2[11] + f[b - 6] * k2[12] - c3[a - 7] * k2[13] + f[b - 7] * k2[14] - c3[a - 8] * k2[15] + f[b - 8] * k2[16] - c3[a - 9] * k2[17] + f[b - 9] * k2[18] - c3[a - 10] * k2[19] + f[b - 10] * k2[20], ++a, ++b;
      }
      function k(f, b, c3, a, m, k2) {
        for (; 0 != m--; ) c3[a] = f[b + 0] * k2[0] - c3[a - 1] * k2[1] + f[b - 1] * k2[2] - c3[a - 2] * k2[3] + f[b - 2] * k2[4], ++a, ++b;
      }
      function n(f) {
        return f * f;
      }
      var V = Y.RMS_WINDOW_TIME_NUMERATOR, E = Y.RMS_WINDOW_TIME_DENOMINATOR, B = [[0.038575994352, -3.84664617118067, -0.02160367184185, 7.81501653005538, -0.00123395316851, -11.34170355132042, -9291677959e-14, 13.05504219327545, -0.01655260341619, -12.28759895145294, 0.02161526843274, 9.4829380631979, -0.02074045215285, -5.87257861775999, 0.00594298065125, 2.75465861874613, 0.00306428023191, -0.86984376593551, 12025322027e-14, 0.13919314567432, 0.00288463683916], [
        0.0541865640643,
        -3.47845948550071,
        -0.02911007808948,
        6.36317777566148,
        -0.00848709379851,
        -8.54751527471874,
        -0.00851165645469,
        9.4769360780128,
        -0.00834990904936,
        -8.81498681370155,
        0.02245293253339,
        6.85401540936998,
        -0.02596338512915,
        -4.39470996079559,
        0.01624864962975,
        2.19611684890774,
        -0.00240879051584,
        -0.75104302451432,
        0.00674613682247,
        0.13149317958808,
        -0.00187763777362
      ], [
        0.15457299681924,
        -2.37898834973084,
        -0.09331049056315,
        2.84868151156327,
        -0.06247880153653,
        -2.64577170229825,
        0.02163541888798,
        2.23697657451713,
        -0.05588393329856,
        -1.67148153367602,
        0.04781476674921,
        1.00595954808547,
        0.00222312597743,
        -0.45953458054983,
        0.03174092540049,
        0.16378164858596,
        -0.01390589421898,
        -0.05032077717131,
        0.00651420667831,
        0.0234789740702,
        -0.00881362733839
      ], [0.30296907319327, -1.61273165137247, -0.22613988682123, 1.0797749225997, -0.08587323730772, -0.2565625775407, 0.03282930172664, -0.1627671912044, -0.00915702933434, -0.22638893773906, -0.02364141202522, 0.39120800788284, -0.00584456039913, -0.22138138954925, 0.06276101321749, 0.04500235387352, -828086748e-14, 0.02005851806501, 0.00205861885564, 0.00302439095741, -0.02950134983287], [
        0.33642304856132,
        -1.49858979367799,
        -0.2557224142557,
        0.87350271418188,
        -0.11828570177555,
        0.12205022308084,
        0.11921148675203,
        -0.80774944671438,
        -0.07834489609479,
        0.47854794562326,
        -0.0046997791438,
        -0.12453458140019,
        -0.0058950022444,
        -0.04067510197014,
        0.05724228140351,
        0.08333755284107,
        0.00832043980773,
        -0.04237348025746,
        -0.0163538138454,
        0.02977207319925,
        -0.0176017656815
      ], [
        0.4491525660845,
        -0.62820619233671,
        -0.14351757464547,
        0.29661783706366,
        -0.22784394429749,
        -0.372563729424,
        -0.01419140100551,
        0.00213767857124,
        0.04078262797139,
        -0.42029820170918,
        -0.12398163381748,
        0.22199650564824,
        0.04097565135648,
        0.00613424350682,
        0.10478503600251,
        0.06747620744683,
        -0.01863887810927,
        0.05784820375801,
        -0.03193428438915,
        0.03222754072173,
        0.00541907748707
      ], [0.56619470757641, -1.04800335126349, -0.75464456939302, 0.29156311971249, 0.1624213774223, -0.26806001042947, 0.16744243493672, 0.00819999645858, -0.18901604199609, 0.45054734505008, 0.3093178284183, -0.33032403314006, -0.27562961986224, 0.0673936833311, 0.00647310677246, -0.04784254229033, 0.08647503780351, 0.01639907836189, -0.0378898455484, 0.01807364323573, -0.00588215443421], [
        0.58100494960553,
        -0.51035327095184,
        -0.53174909058578,
        -0.31863563325245,
        -0.14289799034253,
        -0.20256413484477,
        0.17520704835522,
        0.1472815413433,
        0.02377945217615,
        0.38952639978999,
        0.15558449135573,
        -0.23313271880868,
        -0.25344790059353,
        -0.05246019024463,
        0.01628462406333,
        -0.02505961724053,
        0.06920467763959,
        0.02442357316099,
        -0.03721611395801,
        0.01818801111503,
        -0.00749618797172
      ], [
        0.53648789255105,
        -0.2504987195602,
        -0.42163034350696,
        -0.43193942311114,
        -0.00275953611929,
        -0.03424681017675,
        0.04267842219415,
        -0.04678328784242,
        -0.10214864179676,
        0.26408300200955,
        0.14590772289388,
        0.15113130533216,
        -0.02459864859345,
        -0.17556493366449,
        -0.11202315195388,
        -0.18823009262115,
        -0.04060034127,
        0.05477720428674,
        0.0478866554818,
        0.0470440968812,
        -0.02217936801134
      ]], w2 = [[0.98621192462708, -1.97223372919527, -1.97242384925416, 0.97261396931306, 0.98621192462708], [0.98500175787242, -1.96977855582618, -1.97000351574484, 0.9702284756635, 0.98500175787242], [0.97938932735214, -1.95835380975398, -1.95877865470428, 0.95920349965459, 0.97938932735214], [0.97531843204928, -1.95002759149878, -1.95063686409857, 0.95124613669835, 0.97531843204928], [
        0.97316523498161,
        -1.94561023566527,
        -1.94633046996323,
        0.94705070426118,
        0.97316523498161
      ], [0.96454515552826, -1.92783286977036, -1.92909031105652, 0.93034775234268, 0.96454515552826], [0.96009142950541, -1.91858953033784, -1.92018285901082, 0.92177618768381, 0.96009142950541], [0.95856916599601, -1.9154210807478, -1.91713833199203, 0.91885558323625, 0.95856916599601], [0.94597685600279, -1.88903307939452, -1.89195371200558, 0.89487434461664, 0.94597685600279]];
      this.InitGainAnalysis = function(f, b) {
        a: {
          for (var c3 = 0; c3 < MAX_ORDER; c3++) f.linprebuf[c3] = f.lstepbuf[c3] = f.loutbuf[c3] = f.rinprebuf[c3] = f.rstepbuf[c3] = f.routbuf[c3] = 0;
          switch (0 | b) {
            case 48e3:
              f.reqindex = 0;
              break;
            case 44100:
              f.reqindex = 1;
              break;
            case 32e3:
              f.reqindex = 2;
              break;
            case 24e3:
              f.reqindex = 3;
              break;
            case 22050:
              f.reqindex = 4;
              break;
            case 16e3:
              f.reqindex = 5;
              break;
            case 12e3:
              f.reqindex = 6;
              break;
            case 11025:
              f.reqindex = 7;
              break;
            case 8e3:
              f.reqindex = 8;
              break;
            default:
              b = INIT_GAIN_ANALYSIS_ERROR;
              break a;
          }
          f.sampleWindow = 0 | (b * V + E - 1) / E;
          f.lsum = 0;
          f.rsum = 0;
          f.totsamp = 0;
          na.ill(f.A, 0);
          b = INIT_GAIN_ANALYSIS_OK;
        }
        if (b != INIT_GAIN_ANALYSIS_OK) return INIT_GAIN_ANALYSIS_ERROR;
        f.linpre = MAX_ORDER;
        f.rinpre = MAX_ORDER;
        f.lstep = MAX_ORDER;
        f.rstep = MAX_ORDER;
        f.lout = MAX_ORDER;
        f.rout = MAX_ORDER;
        na.fill(f.B, 0);
        return INIT_GAIN_ANALYSIS_OK;
      };
      this.AnalyzeSamples = function(f, b, v, a, m, u, e) {
        if (0 == u) return GAIN_ANALYSIS_OK;
        var l = 0;
        var d = u;
        switch (e) {
          case 1:
            a = b;
            m = v;
            break;
          case 2:
            break;
          default:
            return GAIN_ANALYSIS_ERROR;
        }
        u < MAX_ORDER ? (T.arraycopy(b, v, f.linprebuf, MAX_ORDER, u), T.arraycopy(a, m, f.rinprebuf, MAX_ORDER, u)) : (T.arraycopy(b, v, f.linprebuf, MAX_ORDER, MAX_ORDER), T.arraycopy(
          a,
          m,
          f.rinprebuf,
          MAX_ORDER,
          MAX_ORDER
        ));
        for (; 0 < d; ) {
          var g = d > f.sampleWindow - f.totsamp ? f.sampleWindow - f.totsamp : d;
          if (l < MAX_ORDER) {
            e = f.linpre + l;
            var q = f.linprebuf;
            var D = f.rinpre + l;
            var p = f.rinprebuf;
            g > MAX_ORDER - l && (g = MAX_ORDER - l);
          } else e = v + l, q = b, D = m + l, p = a;
          c2(q, e, f.lstepbuf, f.lstep + f.totsamp, g, B[f.reqindex]);
          c2(p, D, f.rstepbuf, f.rstep + f.totsamp, g, B[f.reqindex]);
          k(f.lstepbuf, f.lstep + f.totsamp, f.loutbuf, f.lout + f.totsamp, g, w2[f.reqindex]);
          k(f.rstepbuf, f.rstep + f.totsamp, f.routbuf, f.rout + f.totsamp, g, w2[f.reqindex]);
          e = f.lout + f.totsamp;
          q = f.loutbuf;
          D = f.rout + f.totsamp;
          p = f.routbuf;
          for (var r = g % 8; 0 != r--; ) f.lsum += n(q[e++]), f.rsum += n(p[D++]);
          for (r = g / 8; 0 != r--; ) f.lsum += n(q[e + 0]) + n(q[e + 1]) + n(q[e + 2]) + n(q[e + 3]) + n(q[e + 4]) + n(q[e + 5]) + n(q[e + 6]) + n(q[e + 7]), e += 8, f.rsum += n(p[D + 0]) + n(p[D + 1]) + n(p[D + 2]) + n(p[D + 3]) + n(p[D + 4]) + n(p[D + 5]) + n(p[D + 6]) + n(p[D + 7]), D += 8;
          d -= g;
          l += g;
          f.totsamp += g;
          f.totsamp == f.sampleWindow && (e = 10 * Y.STEPS_per_dB * Math.log10((f.lsum + f.rsum) / f.totsamp * 0.5 + 1e-37), e = 0 >= e ? 0 : 0 | e, e >= f.A.length && (e = f.A.length - 1), f.A[e]++, f.lsum = f.rsum = 0, T.arraycopy(
            f.loutbuf,
            f.totsamp,
            f.loutbuf,
            0,
            MAX_ORDER
          ), T.arraycopy(f.routbuf, f.totsamp, f.routbuf, 0, MAX_ORDER), T.arraycopy(f.lstepbuf, f.totsamp, f.lstepbuf, 0, MAX_ORDER), T.arraycopy(f.rstepbuf, f.totsamp, f.rstepbuf, 0, MAX_ORDER), f.totsamp = 0);
          if (f.totsamp > f.sampleWindow) return GAIN_ANALYSIS_ERROR;
        }
        u < MAX_ORDER ? (T.arraycopy(f.linprebuf, u, f.linprebuf, 0, MAX_ORDER - u), T.arraycopy(f.rinprebuf, u, f.rinprebuf, 0, MAX_ORDER - u), T.arraycopy(b, v, f.linprebuf, MAX_ORDER - u, u), T.arraycopy(a, m, f.rinprebuf, MAX_ORDER - u, u)) : (T.arraycopy(
          b,
          v + u - MAX_ORDER,
          f.linprebuf,
          0,
          MAX_ORDER
        ), T.arraycopy(a, m + u - MAX_ORDER, f.rinprebuf, 0, MAX_ORDER));
        return GAIN_ANALYSIS_OK;
      };
      this.GetTitleGain = function(f) {
        var b = f.A;
        var c3 = f.A.length, a, m = 0;
        for (a = 0; a < c3; a++) m += b[a];
        if (0 == m) b = GAIN_NOT_ENOUGH_SAMPLES;
        else {
          m = 0 | Math.ceil(m * (1 - 0.95));
          for (a = c3; 0 < a-- && !(0 >= (m -= b[a])); ) ;
          b = 64.82 - a / Y.STEPS_per_dB;
        }
        for (c3 = 0; c3 < f.A.length; c3++) f.B[c3] += f.A[c3], f.A[c3] = 0;
        for (c3 = 0; c3 < MAX_ORDER; c3++) f.linprebuf[c3] = f.lstepbuf[c3] = f.loutbuf[c3] = f.rinprebuf[c3] = f.rstepbuf[c3] = f.routbuf[c3] = 0;
        f.totsamp = 0;
        f.lsum = f.rsum = 0;
        return b;
      };
    }
    function wc() {
      function c2(b, c3, a, f2, k2, e, l, d, g, q, D, p, r, t, J) {
        this.vbr_q = b;
        this.quant_comp = c3;
        this.quant_comp_s = a;
        this.expY = f2;
        this.st_lrm = k2;
        this.st_s = e;
        this.masking_adj = l;
        this.masking_adj_short = d;
        this.ath_lower = g;
        this.ath_curve = q;
        this.ath_sensitivity = D;
        this.interch = p;
        this.safejoint = r;
        this.sfb21mod = t;
        this.msfix = J;
      }
      function k(b, c3, a, f2, k2, e, l, d, g, q, D, p, r, t) {
        this.quant_comp = c3;
        this.quant_comp_s = a;
        this.safejoint = f2;
        this.nsmsfix = k2;
        this.st_lrm = e;
        this.st_s = l;
        this.nsbass = d;
        this.scale = g;
        this.masking_adj = q;
        this.ath_lower = D;
        this.ath_curve = p;
        this.interch = r;
        this.sfscale = t;
      }
      function n(b, c3, a) {
        var f2 = b.VBR == G.vbr_rh ? B : w2, k2 = b.VBR_q_frac, e = f2[c3];
        f2 = f2[c3 + 1];
        e.st_lrm += k2 * (f2.st_lrm - e.st_lrm);
        e.st_s += k2 * (f2.st_s - e.st_s);
        e.masking_adj += k2 * (f2.masking_adj - e.masking_adj);
        e.masking_adj_short += k2 * (f2.masking_adj_short - e.masking_adj_short);
        e.ath_lower += k2 * (f2.ath_lower - e.ath_lower);
        e.ath_curve += k2 * (f2.ath_curve - e.ath_curve);
        e.ath_sensitivity += k2 * (f2.ath_sensitivity - e.ath_sensitivity);
        e.interch += k2 * (f2.interch - e.interch);
        e.msfix += k2 * (f2.msfix - e.msfix);
        f2 = e.vbr_q;
        0 > f2 && (f2 = 0);
        9 < f2 && (f2 = 9);
        b.VBR_q = f2;
        b.VBR_q_frac = 0;
        0 != a ? b.quant_comp = e.quant_comp : 0 < Math.abs(b.quant_comp - -1) || (b.quant_comp = e.quant_comp);
        0 != a ? b.quant_comp_short = e.quant_comp_s : 0 < Math.abs(b.quant_comp_short - -1) || (b.quant_comp_short = e.quant_comp_s);
        0 != e.expY && (b.experimentalY = 0 != e.expY);
        0 != a ? b.internal_flags.nsPsy.attackthre = e.st_lrm : 0 < Math.abs(b.internal_flags.nsPsy.attackthre - -1) || (b.internal_flags.nsPsy.attackthre = e.st_lrm);
        0 != a ? b.internal_flags.nsPsy.attackthre_s = e.st_s : 0 < Math.abs(b.internal_flags.nsPsy.attackthre_s - -1) || (b.internal_flags.nsPsy.attackthre_s = e.st_s);
        0 != a ? b.maskingadjust = e.masking_adj : 0 < Math.abs(b.maskingadjust - 0) || (b.maskingadjust = e.masking_adj);
        0 != a ? b.maskingadjust_short = e.masking_adj_short : 0 < Math.abs(b.maskingadjust_short - 0) || (b.maskingadjust_short = e.masking_adj_short);
        0 != a ? b.ATHlower = -e.ath_lower / 10 : 0 < Math.abs(10 * -b.ATHlower) || (b.ATHlower = -e.ath_lower / 10);
        0 != a ? b.ATHcurve = e.ath_curve : 0 < Math.abs(b.ATHcurve - -1) || (b.ATHcurve = e.ath_curve);
        0 != a ? b.athaa_sensitivity = e.ath_sensitivity : 0 < Math.abs(b.athaa_sensitivity - -1) || (b.athaa_sensitivity = e.ath_sensitivity);
        0 < e.interch && (0 != a ? b.interChRatio = e.interch : 0 < Math.abs(b.interChRatio - -1) || (b.interChRatio = e.interch));
        0 < e.safejoint && (b.exp_nspsytune |= e.safejoint);
        0 < e.sfb21mod && (b.exp_nspsytune |= e.sfb21mod << 20);
        0 != a ? b.msfix = e.msfix : 0 < Math.abs(b.msfix - -1) || (b.msfix = e.msfix);
        0 == a && (b.VBR_q = c3, b.VBR_q_frac = k2);
      }
      function V(b, c3, a) {
        var m = E.nearestBitrateFullIndex(c3);
        b.VBR = G.vbr_abr;
        b.VBR_mean_bitrate_kbps = c3;
        b.VBR_mean_bitrate_kbps = Math.min(b.VBR_mean_bitrate_kbps, 320);
        b.VBR_mean_bitrate_kbps = Math.max(b.VBR_mean_bitrate_kbps, 8);
        b.brate = b.VBR_mean_bitrate_kbps;
        320 < b.VBR_mean_bitrate_kbps && (b.disable_reservoir = true);
        0 < f[m].safejoint && (b.exp_nspsytune |= 2);
        0 < f[m].sfscale && (b.internal_flags.noise_shaping = 2);
        if (0 < Math.abs(f[m].nsbass)) {
          var k2 = int(4 * f[m].nsbass);
          0 > k2 && (k2 += 64);
          b.exp_nspsytune |= k2 << 2;
        }
        0 != a ? b.quant_comp = f[m].quant_comp : 0 < Math.abs(b.quant_comp - -1) || (b.quant_comp = f[m].quant_comp);
        0 != a ? b.quant_comp_short = f[m].quant_comp_s : 0 < Math.abs(b.quant_comp_short - -1) || (b.quant_comp_short = f[m].quant_comp_s);
        0 != a ? b.msfix = f[m].nsmsfix : 0 < Math.abs(b.msfix - -1) || (b.msfix = f[m].nsmsfix);
        0 != a ? b.internal_flags.nsPsy.attackthre = f[m].st_lrm : 0 < Math.abs(b.internal_flags.nsPsy.attackthre - -1) || (b.internal_flags.nsPsy.attackthre = f[m].st_lrm);
        0 != a ? b.internal_flags.nsPsy.attackthre_s = f[m].st_s : 0 < Math.abs(b.internal_flags.nsPsy.attackthre_s - -1) || (b.internal_flags.nsPsy.attackthre_s = f[m].st_s);
        0 != a ? b.scale = f[m].scale : 0 < Math.abs(b.scale - -1) || (b.scale = f[m].scale);
        0 != a ? b.maskingadjust = f[m].masking_adj : 0 < Math.abs(b.maskingadjust - 0) || (b.maskingadjust = f[m].masking_adj);
        0 < f[m].masking_adj ? 0 != a ? b.maskingadjust_short = 0.9 * f[m].masking_adj : 0 < Math.abs(b.maskingadjust_short - 0) || (b.maskingadjust_short = 0.9 * f[m].masking_adj) : 0 != a ? b.maskingadjust_short = 1.1 * f[m].masking_adj : 0 < Math.abs(b.maskingadjust_short - 0) || (b.maskingadjust_short = 1.1 * f[m].masking_adj);
        0 != a ? b.ATHlower = -f[m].ath_lower / 10 : 0 < Math.abs(10 * -b.ATHlower) || (b.ATHlower = -f[m].ath_lower / 10);
        0 != a ? b.ATHcurve = f[m].ath_curve : 0 < Math.abs(b.ATHcurve - -1) || (b.ATHcurve = f[m].ath_curve);
        0 != a ? b.interChRatio = f[m].interch : 0 < Math.abs(b.interChRatio - -1) || (b.interChRatio = f[m].interch);
        return c3;
      }
      var E;
      this.setModules = function(b) {
        E = b;
      };
      var B = [new c2(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, 0.97), new c2(1, 9, 9, 0, 5.3, 125, -3.6, -5.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new c2(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49), new c2(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64), new c2(4, 9, 9, 1, 6, 135, -0.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79), new c2(5, 9, 9, 1, 6.4, 140, 0.5, 0.4, -7.5, 4, -12, 2e-4, 0, 0, 1.95), new c2(
        6,
        9,
        9,
        1,
        6.6,
        145,
        0.67,
        0.65,
        -14.7,
        6.5,
        -19,
        4e-4,
        0,
        0,
        2.3
      ), new c2(7, 9, 9, 1, 6.6, 145, 0.8, 0.75, -19.7, 8, -22, 6e-4, 0, 0, 2.7), new c2(8, 9, 9, 1, 6.6, 145, 1.2, 1.15, -27.5, 10, -23, 7e-4, 0, 0, 0), new c2(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0), new c2(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0)], w2 = [new c2(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, 0.97), new c2(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new c2(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49), new c2(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64), new c2(4, 9, 9, 1, 4.2, 25, -2.2, 0.1, 0, 3.5, -8, 0, 2, 0, 1.79), new c2(
        5,
        9,
        9,
        1,
        4.2,
        25,
        -1,
        1.65,
        -7.7,
        4,
        -12,
        2e-4,
        0,
        0,
        1.95
      ), new c2(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2), new c2(7, 9, 9, 1, 4.2, 25, 0.5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2), new c2(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2), new c2(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2), new c2(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2)], f = [
        new k(8, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -30, 11, 12e-4, 1),
        new k(16, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -25, 11, 1e-3, 1),
        new k(24, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -20, 11, 1e-3, 1),
        new k(32, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -15, 11, 1e-3, 1),
        new k(40, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -10, 11, 9e-4, 1),
        new k(48, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -10, 11, 9e-4, 1),
        new k(56, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -6, 11, 8e-4, 1),
        new k(64, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -2, 11, 8e-4, 1),
        new k(80, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, 0, 8, 7e-4, 1),
        new k(96, 9, 9, 0, 2.5, 6.6, 145, 0, 0.95, 0, 1, 5.5, 6e-4, 1),
        new k(112, 9, 9, 0, 2.25, 6.6, 145, 0, 0.95, 0, 2, 4.5, 5e-4, 1),
        new k(128, 9, 9, 0, 1.95, 6.4, 140, 0, 0.95, 0, 3, 4, 2e-4, 1),
        new k(160, 9, 9, 1, 1.79, 6, 135, 0, 0.95, -2, 5, 3.5, 0, 1),
        new k(192, 9, 9, 1, 1.49, 5.6, 125, 0, 0.97, -4, 7, 3, 0, 0),
        new k(
          224,
          9,
          9,
          1,
          1.25,
          5.2,
          125,
          0,
          0.98,
          -6,
          9,
          2,
          0,
          0
        ),
        new k(256, 9, 9, 1, 0.97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0),
        new k(320, 9, 9, 1, 0.9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0)
      ];
      this.apply_preset = function(b, c3, a) {
        switch (c3) {
          case W.R3MIX:
            c3 = W.V3;
            b.VBR = G.vbr_mtrh;
            break;
          case W.MEDIUM:
            c3 = W.V4;
            b.VBR = G.vbr_rh;
            break;
          case W.MEDIUM_FAST:
            c3 = W.V4;
            b.VBR = G.vbr_mtrh;
            break;
          case W.STANDARD:
            c3 = W.V2;
            b.VBR = G.vbr_rh;
            break;
          case W.STANDARD_FAST:
            c3 = W.V2;
            b.VBR = G.vbr_mtrh;
            break;
          case W.EXTREME:
            c3 = W.V0;
            b.VBR = G.vbr_rh;
            break;
          case W.EXTREME_FAST:
            c3 = W.V0;
            b.VBR = G.vbr_mtrh;
            break;
          case W.INSANE:
            return c3 = 320, b.preset = c3, V(b, c3, a), b.VBR = G.vbr_off, c3;
        }
        b.preset = c3;
        switch (c3) {
          case W.V9:
            return n(b, 9, a), c3;
          case W.V8:
            return n(b, 8, a), c3;
          case W.V7:
            return n(b, 7, a), c3;
          case W.V6:
            return n(b, 6, a), c3;
          case W.V5:
            return n(b, 5, a), c3;
          case W.V4:
            return n(b, 4, a), c3;
          case W.V3:
            return n(b, 3, a), c3;
          case W.V2:
            return n(b, 2, a), c3;
          case W.V1:
            return n(b, 1, a), c3;
          case W.V0:
            return n(b, 0, a), c3;
        }
        if (8 <= c3 && 320 >= c3) return V(b, c3, a);
        b.preset = 0;
        return c3;
      };
    }
    function qb() {
      function u(a2) {
        this.bits = 0 | a2;
      }
      function k(a2, d2, p, b2, e2, c2) {
        d2 = 0.5946 / d2;
        for (a2 >>= 1; 0 != a2--; ) e2[c2++] = d2 > p[b2++] ? 0 : 1, e2[c2++] = d2 > p[b2++] ? 0 : 1;
      }
      function n(a2, d2, b2, e2, c2, l2) {
        a2 >>= 1;
        var h = a2 % 2;
        for (a2 >>= 1; 0 != a2--; ) {
          var p = b2[e2++] * d2;
          var r = b2[e2++] * d2;
          var t = 0 | p;
          var f2 = b2[e2++] * d2;
          var g2 = 0 | r;
          var J = b2[e2++] * d2;
          var D = 0 | f2;
          p += B.adj43[t];
          t = 0 | J;
          r += B.adj43[g2];
          c2[l2++] = 0 | p;
          f2 += B.adj43[D];
          c2[l2++] = 0 | r;
          J += B.adj43[t];
          c2[l2++] = 0 | f2;
          c2[l2++] = 0 | J;
        }
        0 != h && (p = b2[e2++] * d2, r = b2[e2++] * d2, p += B.adj43[0 | p], r += B.adj43[0 | r], c2[l2++] = 0 | p, c2[l2++] = 0 | r);
      }
      function V(a2, d2, b2, e2) {
        var p, c2 = d2, h = p = 0;
        do {
          var r = a2[c2++], l2 = a2[c2++];
          p < r && (p = r);
          h < l2 && (h = l2);
        } while (c2 < b2);
        p < h && (p = h);
        switch (p) {
          case 0:
            return p;
          case 1:
            c2 = d2;
            d2 = 0;
            p = w.ht[1].hlen;
            do
              h = 2 * a2[c2 + 0] + a2[c2 + 1], c2 += 2, d2 += p[h];
            while (c2 < b2);
            e2.bits += d2;
            return 1;
          case 2:
          case 3:
            c2 = d2;
            d2 = f[p - 1];
            p = 0;
            h = w.ht[d2].xlen;
            r = 2 == d2 ? w.table23 : w.table56;
            do
              l2 = a2[c2 + 0] * h + a2[c2 + 1], c2 += 2, p += r[l2];
            while (c2 < b2);
            a2 = p & 65535;
            p >>= 16;
            p > a2 && (p = a2, d2++);
            e2.bits += p;
            return d2;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
            c2 = d2;
            d2 = f[p - 1];
            r = h = p = 0;
            l2 = w.ht[d2].xlen;
            var g2 = w.ht[d2].hlen, D = w.ht[d2 + 1].hlen, q = w.ht[d2 + 2].hlen;
            do {
              var m2 = a2[c2 + 0] * l2 + a2[c2 + 1];
              c2 += 2;
              p += g2[m2];
              h += D[m2];
              r += q[m2];
            } while (c2 < b2);
            a2 = d2;
            p > h && (p = h, a2++);
            p > r && (p = r, a2 = d2 + 2);
            e2.bits += p;
            return a2;
          default:
            if (p > ia.IXMAX_VAL) return e2.bits = ia.LARGE_BITS, -1;
            p -= 15;
            for (c2 = 24; 32 > c2 && !(w.ht[c2].linmax >= p); c2++) ;
            for (h = c2 - 8; 24 > h && !(w.ht[h].linmax >= p); h++) ;
            p = h;
            r = 65536 * w.ht[p].xlen + w.ht[c2].xlen;
            h = 0;
            do
              l2 = a2[d2++], g2 = a2[d2++], 0 != l2 && (14 < l2 && (l2 = 15, h += r), l2 *= 16), 0 != g2 && (14 < g2 && (g2 = 15, h += r), l2 += g2), h += w.largetbl[l2];
            while (d2 < b2);
            a2 = h & 65535;
            h >>= 16;
            h > a2 && (h = a2, p = c2);
            e2.bits += h;
            return p;
        }
      }
      function E(a2, d2, p, b2, e2, l2, h, g2) {
        for (var r = d2.big_values, f2 = 2; f2 < c.SBMAX_l + 1; f2++) {
          var x = a2.scalefac_band.l[f2];
          if (x >= r) break;
          var t = e2[f2 - 2] + d2.count1bits;
          if (p.part2_3_length <= t) break;
          t = new u(t);
          x = V(b2, x, r, t);
          t = t.bits;
          p.part2_3_length <= t || (p.assign(d2), p.part2_3_length = t, p.region0_count = l2[f2 - 2], p.region1_count = f2 - 2 - l2[f2 - 2], p.table_select[0] = h[f2 - 2], p.table_select[1] = g2[f2 - 2], p.table_select[2] = x);
        }
      }
      var B = null;
      this.qupvt = null;
      this.setModules = function(a2) {
        B = this.qupvt = a2;
      };
      var ha = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 1], [1, 1], [1, 1], [1, 2], [2, 2], [2, 3], [2, 3], [3, 4], [3, 4], [3, 4], [4, 5], [4, 5], [4, 6], [5, 6], [5, 6], [5, 7], [6, 7], [6, 7]], f = [
        1,
        2,
        5,
        7,
        7,
        10,
        10,
        13,
        13,
        13,
        13,
        13,
        13,
        13,
        13
      ];
      this.noquant_count_bits = function(a2, d2, p) {
        var b2 = d2.l3_enc, e2 = Math.min(576, d2.max_nonzero_coeff + 2 >> 1 << 1);
        null != p && (p.sfb_count1 = 0);
        for (; 1 < e2 && 0 == (b2[e2 - 1] | b2[e2 - 2]); e2 -= 2) ;
        d2.count1 = e2;
        for (var l2 = 0, h = 0; 3 < e2 && !(1 < ((b2[e2 - 1] | b2[e2 - 2] | b2[e2 - 3] | b2[e2 - 4]) & 2147483647)); e2 -= 4) {
          var f2 = 2 * (2 * (2 * b2[e2 - 4] + b2[e2 - 3]) + b2[e2 - 2]) + b2[e2 - 1];
          l2 += w.t32l[f2];
          h += w.t33l[f2];
        }
        f2 = l2;
        d2.count1table_select = 0;
        l2 > h && (f2 = h, d2.count1table_select = 1);
        d2.count1bits = f2;
        d2.big_values = e2;
        if (0 == e2) return f2;
        d2.block_type == c.SHORT_TYPE ? (l2 = 3 * a2.scalefac_band.s[3], l2 > d2.big_values && (l2 = d2.big_values), h = d2.big_values) : d2.block_type == c.NORM_TYPE ? (l2 = d2.region0_count = a2.bv_scf[e2 - 2], h = d2.region1_count = a2.bv_scf[e2 - 1], h = a2.scalefac_band.l[l2 + h + 2], l2 = a2.scalefac_band.l[l2 + 1], h < e2 && (f2 = new u(f2), d2.table_select[2] = V(b2, h, e2, f2), f2 = f2.bits)) : (d2.region0_count = 7, d2.region1_count = c.SBMAX_l - 1 - 7 - 1, l2 = a2.scalefac_band.l[8], h = e2, l2 > h && (l2 = h));
        l2 = Math.min(l2, e2);
        h = Math.min(h, e2);
        0 < l2 && (f2 = new u(f2), d2.table_select[0] = V(b2, 0, l2, f2), f2 = f2.bits);
        l2 < h && (f2 = new u(f2), d2.table_select[1] = V(b2, l2, h, f2), f2 = f2.bits);
        2 == a2.use_best_huffman && (d2.part2_3_length = f2, best_huffman_divide(a2, d2), f2 = d2.part2_3_length);
        if (null != p && d2.block_type == c.NORM_TYPE) {
          for (b2 = 0; a2.scalefac_band.l[b2] < d2.big_values; ) b2++;
          p.sfb_count1 = b2;
        }
        return f2;
      };
      this.count_bits = function(a2, d2, e2, b2) {
        var p = e2.l3_enc, l2 = ia.IXMAX_VAL / B.IPOW20(e2.global_gain);
        if (e2.xrpow_max > l2) return ia.LARGE_BITS;
        l2 = B.IPOW20(e2.global_gain);
        var h, f2 = 0, g2 = 0, r = 0, D = 0, m2 = 0, q = p, v2 = 0, C = d2, I = 0;
        var Q = null != b2 && e2.global_gain == b2.global_gain;
        var S = e2.block_type == c.SHORT_TYPE ? 38 : 21;
        for (h = 0; h <= S; h++) {
          var u2 = -1;
          if (Q || e2.block_type == c.NORM_TYPE) u2 = e2.global_gain - (e2.scalefac[h] + (0 != e2.preflag ? B.pretab[h] : 0) << e2.scalefac_scale + 1) - 8 * e2.subblock_gain[e2.window[h]];
          if (Q && b2.step[h] == u2) 0 != g2 && (n(g2, l2, C, I, q, v2), g2 = 0), 0 != r && (k(r, l2, C, I, q, v2), r = 0);
          else {
            var Z = e2.width[h];
            f2 + e2.width[h] > e2.max_nonzero_coeff && (h = e2.max_nonzero_coeff - f2 + 1, na.fill(p, e2.max_nonzero_coeff, 576, 0), Z = h, 0 > Z && (Z = 0), h = S + 1);
            0 == g2 && 0 == r && (q = p, v2 = m2, C = d2, I = D);
            null != b2 && 0 < b2.sfb_count1 && h >= b2.sfb_count1 && 0 < b2.step[h] && u2 >= b2.step[h] ? (0 != g2 && (n(g2, l2, C, I, q, v2), g2 = 0, q = p, v2 = m2, C = d2, I = D), r += Z) : (0 != r && (k(r, l2, C, I, q, v2), r = 0, q = p, v2 = m2, C = d2, I = D), g2 += Z);
            if (0 >= Z) {
              0 != r && (k(r, l2, C, I, q, v2), r = 0);
              0 != g2 && (n(g2, l2, C, I, q, v2), g2 = 0);
              break;
            }
          }
          h <= S && (m2 += e2.width[h], D += e2.width[h], f2 += e2.width[h]);
        }
        0 != g2 && n(g2, l2, C, I, q, v2);
        0 != r && k(r, l2, C, I, q, v2);
        if (0 != (a2.substep_shaping & 2)) for (l2 = 0, S = 0.634521682242439 / B.IPOW20(e2.global_gain + e2.scalefac_scale), f2 = 0; f2 < e2.sfbmax; f2++) if (Q = e2.width[f2], 0 == a2.pseudohalf[f2]) l2 += Q;
        else for (g2 = l2, l2 += Q; g2 < l2; ++g2) p[g2] = d2[g2] >= S ? p[g2] : 0;
        return this.noquant_count_bits(a2, e2, b2);
      };
      this.best_huffman_divide = function(a2, d2) {
        var e2 = new rb(), b2 = d2.l3_enc, l2 = X(23), f2 = X(23), h = X(23), g2 = X(23);
        if (d2.block_type != c.SHORT_TYPE || 1 != a2.mode_gr) {
          e2.assign(d2);
          if (d2.block_type == c.NORM_TYPE) {
            for (var y = d2.big_values, m2 = 0; 22 >= m2; m2++) l2[m2] = ia.LARGE_BITS;
            for (m2 = 0; 16 > m2; m2++) {
              var D = a2.scalefac_band.l[m2 + 1];
              if (D >= y) break;
              var q = 0, k2 = new u(q), v2 = V(b2, 0, D, k2);
              q = k2.bits;
              for (var C = 0; 8 > C; C++) {
                var I = a2.scalefac_band.l[m2 + C + 2];
                if (I >= y) break;
                k2 = q;
                k2 = new u(k2);
                I = V(b2, D, I, k2);
                k2 = k2.bits;
                l2[m2 + C] > k2 && (l2[m2 + C] = k2, f2[m2 + C] = m2, h[m2 + C] = v2, g2[m2 + C] = I);
              }
            }
            E(a2, e2, d2, b2, l2, f2, h, g2);
          }
          y = e2.big_values;
          if (!(0 == y || 1 < (b2[y - 2] | b2[y - 1]) || (y = d2.count1 + 2, 576 < y))) {
            e2.assign(d2);
            e2.count1 = y;
            for (D = m2 = 0; y > e2.big_values; y -= 4) q = 2 * (2 * (2 * b2[y - 4] + b2[y - 3]) + b2[y - 2]) + b2[y - 1], m2 += w.t32l[q], D += w.t33l[q];
            e2.big_values = y;
            e2.count1table_select = 0;
            m2 > D && (m2 = D, e2.count1table_select = 1);
            e2.count1bits = m2;
            e2.block_type == c.NORM_TYPE ? E(a2, e2, d2, b2, l2, f2, h, g2) : (e2.part2_3_length = m2, m2 = a2.scalefac_band.l[8], m2 > y && (m2 = y), 0 < m2 && (a2 = new u(e2.part2_3_length), e2.table_select[0] = V(b2, 0, m2, a2), e2.part2_3_length = a2.bits), y > m2 && (a2 = new u(e2.part2_3_length), e2.table_select[1] = V(b2, m2, y, a2), e2.part2_3_length = a2.bits), d2.part2_3_length > e2.part2_3_length && d2.assign(e2));
          }
        }
      };
      var b = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16], v = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8], a = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4], m = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
      qb.slen1_tab = a;
      qb.slen2_tab = m;
      this.best_scalefac_store = function(d2, e2, p, l2) {
        var f2 = l2.tt[e2][p], g2, h, r = 0;
        for (g2 = h = 0; g2 < f2.sfbmax; g2++) {
          var y = f2.width[g2];
          h += y;
          for (y = -y; 0 > y && 0 == f2.l3_enc[y + h]; y++) ;
          0 == y && (f2.scalefac[g2] = r = -2);
        }
        if (0 == f2.scalefac_scale && 0 == f2.preflag) {
          for (g2 = h = 0; g2 < f2.sfbmax; g2++) 0 < f2.scalefac[g2] && (h |= f2.scalefac[g2]);
          if (0 == (h & 1) && 0 != h) {
            for (g2 = 0; g2 < f2.sfbmax; g2++) 0 < f2.scalefac[g2] && (f2.scalefac[g2] >>= 1);
            f2.scalefac_scale = r = 1;
          }
        }
        if (0 == f2.preflag && f2.block_type != c.SHORT_TYPE && 2 == d2.mode_gr) {
          for (g2 = 11; g2 < c.SBPSY_l && !(f2.scalefac[g2] < B.pretab[g2] && -2 != f2.scalefac[g2]); g2++) ;
          if (g2 == c.SBPSY_l) {
            for (g2 = 11; g2 < c.SBPSY_l; g2++) 0 < f2.scalefac[g2] && (f2.scalefac[g2] -= B.pretab[g2]);
            f2.preflag = r = 1;
          }
        }
        for (g2 = 0; 4 > g2; g2++) l2.scfsi[p][g2] = 0;
        if (2 == d2.mode_gr && 1 == e2 && l2.tt[0][p].block_type != c.SHORT_TYPE && l2.tt[1][p].block_type != c.SHORT_TYPE) {
          e2 = l2.tt[1][p];
          h = l2.tt[0][p];
          for (r = 0; r < w.scfsi_band.length - 1; r++) {
            for (g2 = w.scfsi_band[r]; g2 < w.scfsi_band[r + 1] && !(h.scalefac[g2] != e2.scalefac[g2] && 0 <= e2.scalefac[g2]); g2++) ;
            if (g2 == w.scfsi_band[r + 1]) {
              for (g2 = w.scfsi_band[r]; g2 < w.scfsi_band[r + 1]; g2++) e2.scalefac[g2] = -1;
              l2.scfsi[p][r] = 1;
            }
          }
          for (g2 = l2 = p = 0; 11 > g2; g2++) -1 != e2.scalefac[g2] && (l2++, p < e2.scalefac[g2] && (p = e2.scalefac[g2]));
          for (y = h = 0; g2 < c.SBPSY_l; g2++) -1 != e2.scalefac[g2] && (y++, h < e2.scalefac[g2] && (h = e2.scalefac[g2]));
          for (r = 0; 16 > r; r++) p < b[r] && h < v[r] && (g2 = a[r] * l2 + m[r] * y, e2.part2_length > g2 && (e2.part2_length = g2, e2.scalefac_compress = r));
          r = 0;
        }
        for (g2 = 0; g2 < f2.sfbmax; g2++) -2 == f2.scalefac[g2] && (f2.scalefac[g2] = 0);
        0 != r && (2 == d2.mode_gr ? this.scale_bitcount(f2) : this.scale_bitcount_lsf(d2, f2));
      };
      var z = [0, 18, 36, 54, 54, 36, 54, 72, 54, 72, 90, 72, 90, 108, 108, 126], e = [0, 18, 36, 54, 51, 35, 53, 71, 52, 70, 88, 69, 87, 105, 104, 122], l = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];
      this.scale_bitcount = function(a2) {
        var d2, g2 = 0, f2 = 0, t = a2.scalefac;
        if (a2.block_type == c.SHORT_TYPE) {
          var m2 = z;
          0 != a2.mixed_block_flag && (m2 = e);
        } else if (m2 = l, 0 == a2.preflag) {
          for (d2 = 11; d2 < c.SBPSY_l && !(t[d2] < B.pretab[d2]); d2++) ;
          if (d2 == c.SBPSY_l) for (a2.preflag = 1, d2 = 11; d2 < c.SBPSY_l; d2++) t[d2] -= B.pretab[d2];
        }
        for (d2 = 0; d2 < a2.sfbdivide; d2++) g2 < t[d2] && (g2 = t[d2]);
        for (; d2 < a2.sfbmax; d2++) f2 < t[d2] && (f2 = t[d2]);
        a2.part2_length = ia.LARGE_BITS;
        for (d2 = 0; 16 > d2; d2++) g2 < b[d2] && f2 < v[d2] && a2.part2_length > m2[d2] && (a2.part2_length = m2[d2], a2.scalefac_compress = d2);
        return a2.part2_length == ia.LARGE_BITS;
      };
      var d = [[15, 15, 7, 7], [15, 15, 7, 0], [7, 3, 0, 0], [15, 31, 31, 0], [7, 7, 7, 0], [3, 3, 0, 0]];
      this.scale_bitcount_lsf = function(a2, e2) {
        var b2, f2, l2, m2, h = X(4), x = e2.scalefac;
        a2 = 0 != e2.preflag ? 2 : 0;
        for (l2 = 0; 4 > l2; l2++) h[l2] = 0;
        if (e2.block_type == c.SHORT_TYPE) {
          var y = 1;
          var k2 = B.nr_of_sfb_block[a2][y];
          for (b2 = m2 = 0; 4 > b2; b2++) {
            var q = k2[b2] / 3;
            for (l2 = 0; l2 < q; l2++, m2++) for (f2 = 0; 3 > f2; f2++) x[3 * m2 + f2] > h[b2] && (h[b2] = x[3 * m2 + f2]);
          }
        } else for (y = 0, k2 = B.nr_of_sfb_block[a2][y], b2 = m2 = 0; 4 > b2; b2++) for (q = k2[b2], l2 = 0; l2 < q; l2++, m2++) x[m2] > h[b2] && (h[b2] = x[m2]);
        q = false;
        for (b2 = 0; 4 > b2; b2++) h[b2] > d[a2][b2] && (q = true);
        if (!q) {
          e2.sfb_partition_table = B.nr_of_sfb_block[a2][y];
          for (b2 = 0; 4 > b2; b2++) e2.slen[b2] = g[h[b2]];
          y = e2.slen[0];
          b2 = e2.slen[1];
          h = e2.slen[2];
          f2 = e2.slen[3];
          switch (a2) {
            case 0:
              e2.scalefac_compress = (5 * y + b2 << 4) + (h << 2) + f2;
              break;
            case 1:
              e2.scalefac_compress = 400 + (5 * y + b2 << 2) + h;
              break;
            case 2:
              e2.scalefac_compress = 500 + 3 * y + b2;
              break;
            default:
              T.err.printf("intensity stereo not implemented yet\n");
          }
        }
        if (!q) for (b2 = e2.part2_length = 0; 4 > b2; b2++) e2.part2_length += e2.slen[b2] * e2.sfb_partition_table[b2];
        return q;
      };
      var g = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
      this.huffman_init = function(a2) {
        for (var d2 = 2; 576 >= d2; d2 += 2) {
          for (var e2 = 0, b2; a2.scalefac_band.l[++e2] < d2; ) ;
          for (b2 = ha[e2][0]; a2.scalefac_band.l[b2 + 1] > d2; ) b2--;
          0 > b2 && (b2 = ha[e2][0]);
          a2.bv_scf[d2 - 2] = b2;
          for (b2 = ha[e2][1]; a2.scalefac_band.l[b2 + a2.bv_scf[d2 - 2] + 2] > d2; ) b2--;
          0 > b2 && (b2 = ha[e2][1]);
          a2.bv_scf[d2 - 1] = b2;
        }
      };
    }
    function xc() {
      var c2;
      this.setModules = function(k) {
        c2 = k;
      };
      this.ResvFrameBegin = function(k, n) {
        var u = k.internal_flags, E = u.l3_side, B = c2.getframebits(k);
        n.bits = (B - 8 * u.sideinfo_len) / u.mode_gr;
        var w2 = 2048 * u.mode_gr - 8;
        if (320 < k.brate) var f = 8 * int(1e3 * k.brate / (k.out_samplerate / 1152) / 8 + 0.5);
        else f = 11520, k.strict_ISO && (f = 8 * int(32e4 / (k.out_samplerate / 1152) / 8 + 0.5));
        u.ResvMax = f - B;
        u.ResvMax > w2 && (u.ResvMax = w2);
        if (0 > u.ResvMax || k.disable_reservoir) u.ResvMax = 0;
        k = n.bits * u.mode_gr + Math.min(u.ResvSize, u.ResvMax);
        k > f && (k = f);
        E.resvDrain_pre = 0;
        null != u.pinfo && (u.pinfo.mean_bits = n.bits / 2, u.pinfo.resvsize = u.ResvSize);
        return k;
      };
      this.ResvMaxBits = function(c3, n, u, E) {
        var k = c3.internal_flags, w2 = k.ResvSize, f = k.ResvMax;
        0 != E && (w2 += n);
        0 != (k.substep_shaping & 1) && (f *= 0.9);
        u.bits = n;
        10 * w2 > 9 * f ? (E = w2 - 9 * f / 10, u.bits += E, k.substep_shaping |= 128) : (E = 0, k.substep_shaping &= 127, c3.disable_reservoir || 0 != (k.substep_shaping & 1) || (u.bits -= 0.1 * n));
        c3 = w2 < 6 * k.ResvMax / 10 ? w2 : 6 * k.ResvMax / 10;
        c3 -= E;
        0 > c3 && (c3 = 0);
        return c3;
      };
      this.ResvAdjust = function(c3, n) {
        c3.ResvSize -= n.part2_3_length + n.part2_length;
      };
      this.ResvFrameEnd = function(c3, n) {
        var k, u = c3.l3_side;
        c3.ResvSize += n * c3.mode_gr;
        n = 0;
        u.resvDrain_post = 0;
        u.resvDrain_pre = 0;
        0 != (k = c3.ResvSize % 8) && (n += k);
        k = c3.ResvSize - n - c3.ResvMax;
        0 < k && (n += k);
        k = Math.min(8 * u.main_data_begin, n) / 8;
        u.resvDrain_pre += 8 * k;
        n -= 8 * k;
        c3.ResvSize -= 8 * k;
        u.main_data_begin -= k;
        u.resvDrain_post += n;
        c3.ResvSize -= n;
      };
    }
    function qa() {
      function u(a2, e2, b2) {
        for (; 0 < b2; ) {
          if (0 == D) {
            D = 8;
            q++;
            if (a2.header[a2.w_ptr].write_timing == g) {
              var c2 = a2;
              T.arraycopy(c2.header[c2.w_ptr].buf, 0, d, q, c2.sideinfo_len);
              q += c2.sideinfo_len;
              g += 8 * c2.sideinfo_len;
              c2.w_ptr = c2.w_ptr + 1 & da.MAX_HEADER_BUF - 1;
            }
            d[q] = 0;
          }
          c2 = Math.min(b2, D);
          b2 -= c2;
          D -= c2;
          d[q] |= e2 >> b2 << D;
          g += c2;
        }
      }
      function k(a2, d2) {
        var b2 = a2.internal_flags, c2;
        8 <= d2 && (u(b2, 76, 8), d2 -= 8);
        8 <= d2 && (u(b2, 65, 8), d2 -= 8);
        8 <= d2 && (u(b2, 77, 8), d2 -= 8);
        8 <= d2 && (u(b2, 69, 8), d2 -= 8);
        if (32 <= d2) {
          var h = e.getLameShortVersion();
          if (32 <= d2) for (c2 = 0; c2 < h.length && 8 <= d2; ++c2) d2 -= 8, u(b2, h.charAt(c2), 8);
        }
        for (; 1 <= d2; --d2) u(b2, b2.ancillary_flag, 1), b2.ancillary_flag ^= a2.disable_reservoir ? 0 : 1;
      }
      function n(a2, d2, e2) {
        for (var b2 = a2.header[a2.h_ptr].ptr; 0 < e2; ) {
          var h = Math.min(e2, 8 - (b2 & 7));
          e2 -= h;
          a2.header[a2.h_ptr].buf[b2 >> 3] |= d2 >> e2 << 8 - (b2 & 7) - h;
          b2 += h;
        }
        a2.header[a2.h_ptr].ptr = b2;
      }
      function V(a2, d2) {
        a2 <<= 8;
        for (var e2 = 0; 8 > e2; e2++) a2 <<= 1, d2 <<= 1, 0 != ((d2 ^ a2) & 65536) && (d2 ^= 32773);
        return d2;
      }
      function E(a2, d2) {
        var e2 = w.ht[d2.count1table_select + 32], b2, h = 0, c2 = d2.big_values, g2 = d2.big_values;
        for (b2 = (d2.count1 - d2.big_values) / 4; 0 < b2; --b2) {
          var l2 = 0, f2 = 0;
          var p = d2.l3_enc[c2 + 0];
          0 != p && (f2 += 8, 0 > d2.xr[g2 + 0] && l2++);
          p = d2.l3_enc[c2 + 1];
          0 != p && (f2 += 4, l2 *= 2, 0 > d2.xr[g2 + 1] && l2++);
          p = d2.l3_enc[c2 + 2];
          0 != p && (f2 += 2, l2 *= 2, 0 > d2.xr[g2 + 2] && l2++);
          p = d2.l3_enc[c2 + 3];
          0 != p && (f2++, l2 *= 2, 0 > d2.xr[g2 + 3] && l2++);
          c2 += 4;
          g2 += 4;
          u(
            a2,
            l2 + e2.table[f2],
            e2.hlen[f2]
          );
          h += e2.hlen[f2];
        }
        return h;
      }
      function B(a2, d2, e2, b2, h) {
        var c2 = w.ht[d2], g2 = 0;
        if (0 == d2) return g2;
        for (; e2 < b2; e2 += 2) {
          var l2 = 0, f2 = 0, p = c2.xlen, r = c2.xlen, m2 = 0, C = h.l3_enc[e2], k2 = h.l3_enc[e2 + 1];
          0 != C && (0 > h.xr[e2] && m2++, l2--);
          15 < d2 && (14 < C && (m2 |= C - 15 << 1, f2 = p, C = 15), 14 < k2 && (r = k2 - 15, m2 <<= p, m2 |= r, f2 += p, k2 = 15), r = 16);
          0 != k2 && (m2 <<= 1, 0 > h.xr[e2 + 1] && m2++, l2--);
          C = C * r + k2;
          f2 -= l2;
          l2 += c2.hlen[C];
          u(a2, c2.table[C], l2);
          u(a2, m2, f2);
          g2 += l2 + f2;
        }
        return g2;
      }
      function K2(a2, d2) {
        var e2 = 3 * a2.scalefac_band.s[3];
        e2 > d2.big_values && (e2 = d2.big_values);
        var b2 = B(a2, d2.table_select[0], 0, e2, d2);
        return b2 += B(
          a2,
          d2.table_select[1],
          e2,
          d2.big_values,
          d2
        );
      }
      function f(a2, d2) {
        var e2 = d2.big_values;
        var b2 = d2.region0_count + 1;
        var h = a2.scalefac_band.l[b2];
        b2 += d2.region1_count + 1;
        var c2 = a2.scalefac_band.l[b2];
        h > e2 && (h = e2);
        c2 > e2 && (c2 = e2);
        b2 = B(a2, d2.table_select[0], 0, h, d2);
        b2 += B(a2, d2.table_select[1], h, c2, d2);
        return b2 += B(a2, d2.table_select[2], c2, e2, d2);
      }
      function b() {
        this.total = 0;
      }
      function v(d2, e2) {
        var b2 = d2.internal_flags;
        var c2 = b2.w_ptr;
        var h = b2.h_ptr - 1;
        -1 == h && (h = da.MAX_HEADER_BUF - 1);
        var l2 = b2.header[h].write_timing - g;
        e2.total = l2;
        if (0 <= l2) {
          var f2 = 1 + h - c2;
          h < c2 && (f2 = 1 + h - c2 + da.MAX_HEADER_BUF);
          l2 -= 8 * f2 * b2.sideinfo_len;
        }
        d2 = a.getframebits(d2);
        l2 += d2;
        e2.total += d2;
        e2.total = 0 != e2.total % 8 ? 1 + e2.total / 8 : e2.total / 8;
        e2.total += q + 1;
        0 > l2 && T.err.println("strange error flushing buffer ... \n");
        return l2;
      }
      var a = this, m = null, z = null, e = null, l = null;
      this.setModules = function(a2, d2, b2, c2) {
        m = a2;
        z = d2;
        e = b2;
        l = c2;
      };
      var d = null, g = 0, q = 0, D = 0;
      this.getframebits = function(a2) {
        var d2 = a2.internal_flags;
        return 8 * (0 | 72e3 * (a2.version + 1) * (0 != d2.bitrate_index ? w.bitrate_table[a2.version][d2.bitrate_index] : a2.brate) / a2.out_samplerate + d2.padding);
      };
      this.CRC_writeheader = function(a2, d2) {
        var e2 = V(d2[2] & 255, 65535);
        e2 = V(d2[3] & 255, e2);
        for (var b2 = 6; b2 < a2.sideinfo_len; b2++) e2 = V(d2[b2] & 255, e2);
        d2[4] = byte(e2 >> 8);
        d2[5] = byte(e2 & 255);
      };
      this.flush_bitstream = function(a2) {
        var d2 = a2.internal_flags, e2;
        var c2 = d2.l3_side;
        0 > (e2 = v(a2, new b())) || (k(a2, e2), d2.ResvSize = 0, c2.main_data_begin = 0, d2.findReplayGain && (c2 = m.GetTitleGain(d2.rgdata), d2.RadioGain = Math.floor(10 * c2 + 0.5) | 0), d2.findPeakSample && (d2.noclipGainChange = Math.ceil(200 * Math.log10(d2.PeakSample / 32767)) | 0, 0 < d2.noclipGainChange ? EQ(a2.scale, 1) || EQ(a2.scale, 0) ? d2.noclipScale = Math.floor(32767 / d2.PeakSample * 100) / 100 : d2.noclipScale = -1 : d2.noclipScale = -1));
      };
      this.add_dummy_byte = function(a2, e2, b2) {
        a2 = a2.internal_flags;
        for (var c2; 0 < b2--; ) {
          c2 = e2;
          for (var h = 8; 0 < h; ) {
            0 == D && (D = 8, q++, d[q] = 0);
            var l2 = Math.min(h, D);
            h -= l2;
            D -= l2;
            d[q] |= c2 >> h << D;
            g += l2;
          }
          for (c2 = 0; c2 < da.MAX_HEADER_BUF; ++c2) a2.header[c2].write_timing += 8;
        }
      };
      this.format_bitstream = function(a2) {
        var d2 = a2.internal_flags;
        var e2 = d2.l3_side;
        var l2 = this.getframebits(a2);
        k(a2, e2.resvDrain_pre);
        var h = a2.internal_flags, p, y;
        var m2 = h.l3_side;
        h.header[h.h_ptr].ptr = 0;
        na.fill(
          h.header[h.h_ptr].buf,
          0,
          h.sideinfo_len,
          0
        );
        16e3 > a2.out_samplerate ? n(h, 4094, 12) : n(h, 4095, 12);
        n(h, a2.version, 1);
        n(h, 1, 2);
        n(h, a2.error_protection ? 0 : 1, 1);
        n(h, h.bitrate_index, 4);
        n(h, h.samplerate_index, 2);
        n(h, h.padding, 1);
        n(h, a2.extension, 1);
        n(h, a2.mode.ordinal(), 2);
        n(h, h.mode_ext, 2);
        n(h, a2.copyright, 1);
        n(h, a2.original, 1);
        n(h, a2.emphasis, 2);
        a2.error_protection && n(h, 0, 16);
        if (1 == a2.version) {
          n(h, m2.main_data_begin, 9);
          2 == h.channels_out ? n(h, m2.private_bits, 3) : n(h, m2.private_bits, 5);
          for (y = 0; y < h.channels_out; y++) for (p = 0; 4 > p; p++) n(
            h,
            m2.scfsi[y][p],
            1
          );
          for (p = 0; 2 > p; p++) for (y = 0; y < h.channels_out; y++) {
            var q2 = m2.tt[p][y];
            n(h, q2.part2_3_length + q2.part2_length, 12);
            n(h, q2.big_values / 2, 9);
            n(h, q2.global_gain, 8);
            n(h, q2.scalefac_compress, 4);
            q2.block_type != c.NORM_TYPE ? (n(h, 1, 1), n(h, q2.block_type, 2), n(h, q2.mixed_block_flag, 1), 14 == q2.table_select[0] && (q2.table_select[0] = 16), n(h, q2.table_select[0], 5), 14 == q2.table_select[1] && (q2.table_select[1] = 16), n(h, q2.table_select[1], 5), n(h, q2.subblock_gain[0], 3), n(h, q2.subblock_gain[1], 3), n(h, q2.subblock_gain[2], 3)) : (n(h, 0, 1), 14 == q2.table_select[0] && (q2.table_select[0] = 16), n(h, q2.table_select[0], 5), 14 == q2.table_select[1] && (q2.table_select[1] = 16), n(h, q2.table_select[1], 5), 14 == q2.table_select[2] && (q2.table_select[2] = 16), n(h, q2.table_select[2], 5), n(h, q2.region0_count, 4), n(h, q2.region1_count, 3));
            n(h, q2.preflag, 1);
            n(h, q2.scalefac_scale, 1);
            n(h, q2.count1table_select, 1);
          }
        } else for (n(h, m2.main_data_begin, 8), n(h, m2.private_bits, h.channels_out), y = p = 0; y < h.channels_out; y++) q2 = m2.tt[p][y], n(h, q2.part2_3_length + q2.part2_length, 12), n(h, q2.big_values / 2, 9), n(h, q2.global_gain, 8), n(
          h,
          q2.scalefac_compress,
          9
        ), q2.block_type != c.NORM_TYPE ? (n(h, 1, 1), n(h, q2.block_type, 2), n(h, q2.mixed_block_flag, 1), 14 == q2.table_select[0] && (q2.table_select[0] = 16), n(h, q2.table_select[0], 5), 14 == q2.table_select[1] && (q2.table_select[1] = 16), n(h, q2.table_select[1], 5), n(h, q2.subblock_gain[0], 3), n(h, q2.subblock_gain[1], 3), n(h, q2.subblock_gain[2], 3)) : (n(h, 0, 1), 14 == q2.table_select[0] && (q2.table_select[0] = 16), n(h, q2.table_select[0], 5), 14 == q2.table_select[1] && (q2.table_select[1] = 16), n(h, q2.table_select[1], 5), 14 == q2.table_select[2] && (q2.table_select[2] = 16), n(h, q2.table_select[2], 5), n(h, q2.region0_count, 4), n(h, q2.region1_count, 3)), n(h, q2.scalefac_scale, 1), n(h, q2.count1table_select, 1);
        a2.error_protection && CRC_writeheader(h, h.header[h.h_ptr].buf);
        m2 = h.h_ptr;
        h.h_ptr = m2 + 1 & da.MAX_HEADER_BUF - 1;
        h.header[h.h_ptr].write_timing = h.header[m2].write_timing + l2;
        h.h_ptr == h.w_ptr && T.err.println("Error: MAX_HEADER_BUF too small in bitstream.c \n");
        h = 8 * d2.sideinfo_len;
        var D2 = 0, B2 = a2.internal_flags, z2 = B2.l3_side;
        if (1 == a2.version) for (m2 = 0; 2 > m2; m2++) for (y = 0; y < B2.channels_out; y++) {
          var C = z2.tt[m2][y], I = qb.slen1_tab[C.scalefac_compress], Q = qb.slen2_tab[C.scalefac_compress];
          for (p = q2 = 0; p < C.sfbdivide; p++) -1 != C.scalefac[p] && (u(B2, C.scalefac[p], I), q2 += I);
          for (; p < C.sfbmax; p++) -1 != C.scalefac[p] && (u(B2, C.scalefac[p], Q), q2 += Q);
          q2 = C.block_type == c.SHORT_TYPE ? q2 + K2(B2, C) : q2 + f(B2, C);
          q2 += E(B2, C);
          D2 += q2;
        }
        else for (y = m2 = 0; y < B2.channels_out; y++) {
          C = z2.tt[m2][y];
          var S = 0;
          Q = p = q2 = 0;
          if (C.block_type == c.SHORT_TYPE) {
            for (; 4 > Q; Q++) {
              var w2 = C.sfb_partition_table[Q] / 3, Z = C.slen[Q];
              for (I = 0; I < w2; I++, p++) u(B2, Math.max(C.scalefac[3 * p], 0), Z), u(
                B2,
                Math.max(C.scalefac[3 * p + 1], 0),
                Z
              ), u(B2, Math.max(C.scalefac[3 * p + 2], 0), Z), S += 3 * Z;
            }
            q2 += K2(B2, C);
          } else {
            for (; 4 > Q; Q++) for (w2 = C.sfb_partition_table[Q], Z = C.slen[Q], I = 0; I < w2; I++, p++) u(B2, Math.max(C.scalefac[p], 0), Z), S += Z;
            q2 += f(B2, C);
          }
          q2 += E(B2, C);
          D2 += S + q2;
        }
        h += D2;
        k(a2, e2.resvDrain_post);
        h += e2.resvDrain_post;
        e2.main_data_begin += (l2 - h) / 8;
        v(a2, new b()) != d2.ResvSize && T.err.println("Internal buffer inconsistency. flushbits <> ResvSize");
        8 * e2.main_data_begin != d2.ResvSize && (T.err.printf(
          "bit reservoir error: \nl3_side.main_data_begin: %d \nResvoir size:             %d \nresv drain (post)         %d \nresv drain (pre)          %d \nheader and sideinfo:      %d \ndata bits:                %d \ntotal bits:               %d (remainder: %d) \nbitsperframe:             %d \n",
          8 * e2.main_data_begin,
          d2.ResvSize,
          e2.resvDrain_post,
          e2.resvDrain_pre,
          8 * d2.sideinfo_len,
          h - e2.resvDrain_post - 8 * d2.sideinfo_len,
          h,
          h % 8,
          l2
        ), T.err.println("This is a fatal error.  It has several possible causes:"), T.err.println("90%%  LAME compiled with buggy version of gcc using advanced optimizations"), T.err.println(" 9%%  Your system is overclocked"), T.err.println(" 1%%  bug in LAME encoding library"), d2.ResvSize = 8 * e2.main_data_begin);
        if (1e9 < g) {
          for (a2 = 0; a2 < da.MAX_HEADER_BUF; ++a2) d2.header[a2].write_timing -= g;
          g = 0;
        }
        return 0;
      };
      this.copy_buffer = function(a2, e2, b2, c2, h) {
        var g2 = q + 1;
        if (0 >= g2) return 0;
        if (0 != c2 && g2 > c2) return -1;
        T.arraycopy(d, 0, e2, b2, g2);
        q = -1;
        D = 0;
        if (0 != h && (c2 = X(1), c2[0] = a2.nMusicCRC, l.updateMusicCRC(c2, e2, b2, g2), a2.nMusicCRC = c2[0], 0 < g2 && (a2.VBR_seek_table.nBytesWritten += g2), a2.decode_on_the_fly)) {
          c2 = ca([2, 1152]);
          h = g2;
          for (var f2 = -1, p; 0 != f2; ) if (f2 = z.hip_decode1_unclipped(a2.hip, e2, b2, h, c2[0], c2[1]), h = 0, -1 == f2 && (f2 = 0), 0 < f2) {
            if (a2.findPeakSample) {
              for (p = 0; p < f2; p++) c2[0][p] > a2.PeakSample ? a2.PeakSample = c2[0][p] : -c2[0][p] > a2.PeakSample && (a2.PeakSample = -c2[0][p]);
              if (1 < a2.channels_out) for (p = 0; p < f2; p++) c2[1][p] > a2.PeakSample ? a2.PeakSample = c2[1][p] : -c2[1][p] > a2.PeakSample && (a2.PeakSample = -c2[1][p]);
            }
            if (a2.findReplayGain && m.AnalyzeSamples(a2.rgdata, c2[0], 0, c2[1], 0, f2, a2.channels_out) == Y.GAIN_ANALYSIS_ERROR) return -6;
          }
        }
        return g2;
      };
      this.init_bit_stream_w = function(a2) {
        d = new Int8Array(W.LAME_MAXMP3BUFFER);
        a2.h_ptr = a2.w_ptr = 0;
        a2.header[a2.h_ptr].write_timing = 0;
        q = -1;
        g = D = 0;
      };
    }
    function zb() {
      function c2(a2, b2) {
        var d = a2[b2 + 0] & 255;
        d = d << 8 | a2[b2 + 1] & 255;
        d = d << 8 | a2[b2 + 2] & 255;
        return d = d << 8 | a2[b2 + 3] & 255;
      }
      function k(a2, b2, d) {
        a2[b2 + 0] = d >> 24 & 255;
        a2[b2 + 1] = d >> 16 & 255;
        a2[b2 + 2] = d >> 8 & 255;
        a2[b2 + 3] = d & 255;
      }
      function n(a2, b2, d) {
        a2[b2 + 0] = d >> 8 & 255;
        a2[b2 + 1] = d & 255;
      }
      function V(a2, b2, d) {
        return 255 & (a2 << b2 | d & ~(-1 << b2));
      }
      function E(a2, b2) {
        var d = a2.internal_flags;
        b2[0] = V(b2[0], 8, 255);
        b2[1] = V(b2[1], 3, 7);
        b2[1] = V(b2[1], 1, 16e3 > a2.out_samplerate ? 0 : 1);
        b2[1] = V(b2[1], 1, a2.version);
        b2[1] = V(b2[1], 2, 1);
        b2[1] = V(b2[1], 1, a2.error_protection ? 0 : 1);
        b2[2] = V(b2[2], 4, d.bitrate_index);
        b2[2] = V(b2[2], 2, d.samplerate_index);
        b2[2] = V(b2[2], 1, 0);
        b2[2] = V(b2[2], 1, a2.extension);
        b2[3] = V(b2[3], 2, a2.mode.ordinal());
        b2[3] = V(
          b2[3],
          2,
          d.mode_ext
        );
        b2[3] = V(b2[3], 1, a2.copyright);
        b2[3] = V(b2[3], 1, a2.original);
        b2[3] = V(b2[3], 2, a2.emphasis);
        b2[0] = 255;
        d = b2[1] & 241;
        var e = 1 == a2.version ? 128 : 16e3 > a2.out_samplerate ? 32 : 64;
        a2.VBR == G.vbr_off && (e = a2.brate);
        e = a2.free_format ? 0 : 255 & 16 * K2.BitrateIndex(e, a2.version, a2.out_samplerate);
        b2[1] = 1 == a2.version ? 255 & (d | 10) : 255 & (d | 2);
        d = b2[2] & 13;
        b2[2] = 255 & (e | d);
      }
      function B(a2, b2) {
        return b2 = b2 >> 8 ^ z[(b2 ^ a2) & 255];
      }
      var K2, f, b;
      this.setModules = function(a2, c3, d) {
        K2 = a2;
        f = c3;
        b = d;
      };
      var v = zb.NUMTOCENTRIES, a = zb.MAXFRAMESIZE, m = v + 4 + 4 + 4 + 4 + 4 + 9 + 1 + 1 + 8 + 1 + 1 + 3 + 1 + 1 + 2 + 4 + 2 + 2, z = [
        0,
        49345,
        49537,
        320,
        49921,
        960,
        640,
        49729,
        50689,
        1728,
        1920,
        51009,
        1280,
        50625,
        50305,
        1088,
        52225,
        3264,
        3456,
        52545,
        3840,
        53185,
        52865,
        3648,
        2560,
        51905,
        52097,
        2880,
        51457,
        2496,
        2176,
        51265,
        55297,
        6336,
        6528,
        55617,
        6912,
        56257,
        55937,
        6720,
        7680,
        57025,
        57217,
        8e3,
        56577,
        7616,
        7296,
        56385,
        5120,
        54465,
        54657,
        5440,
        55041,
        6080,
        5760,
        54849,
        53761,
        4800,
        4992,
        54081,
        4352,
        53697,
        53377,
        4160,
        61441,
        12480,
        12672,
        61761,
        13056,
        62401,
        62081,
        12864,
        13824,
        63169,
        63361,
        14144,
        62721,
        13760,
        13440,
        62529,
        15360,
        64705,
        64897,
        15680,
        65281,
        16320,
        16e3,
        65089,
        64001,
        15040,
        15232,
        64321,
        14592,
        63937,
        63617,
        14400,
        10240,
        59585,
        59777,
        10560,
        60161,
        11200,
        10880,
        59969,
        60929,
        11968,
        12160,
        61249,
        11520,
        60865,
        60545,
        11328,
        58369,
        9408,
        9600,
        58689,
        9984,
        59329,
        59009,
        9792,
        8704,
        58049,
        58241,
        9024,
        57601,
        8640,
        8320,
        57409,
        40961,
        24768,
        24960,
        41281,
        25344,
        41921,
        41601,
        25152,
        26112,
        42689,
        42881,
        26432,
        42241,
        26048,
        25728,
        42049,
        27648,
        44225,
        44417,
        27968,
        44801,
        28608,
        28288,
        44609,
        43521,
        27328,
        27520,
        43841,
        26880,
        43457,
        43137,
        26688,
        30720,
        47297,
        47489,
        31040,
        47873,
        31680,
        31360,
        47681,
        48641,
        32448,
        32640,
        48961,
        32e3,
        48577,
        48257,
        31808,
        46081,
        29888,
        30080,
        46401,
        30464,
        47041,
        46721,
        30272,
        29184,
        45761,
        45953,
        29504,
        45313,
        29120,
        28800,
        45121,
        20480,
        37057,
        37249,
        20800,
        37633,
        21440,
        21120,
        37441,
        38401,
        22208,
        22400,
        38721,
        21760,
        38337,
        38017,
        21568,
        39937,
        23744,
        23936,
        40257,
        24320,
        40897,
        40577,
        24128,
        23040,
        39617,
        39809,
        23360,
        39169,
        22976,
        22656,
        38977,
        34817,
        18624,
        18816,
        35137,
        19200,
        35777,
        35457,
        19008,
        19968,
        36545,
        36737,
        20288,
        36097,
        19904,
        19584,
        35905,
        17408,
        33985,
        34177,
        17728,
        34561,
        18368,
        18048,
        34369,
        33281,
        17088,
        17280,
        33601,
        16640,
        33217,
        32897,
        16448
      ];
      this.addVbrFrame = function(a2) {
        var b2 = a2.internal_flags;
        var d = b2.VBR_seek_table;
        a2 = w.bitrate_table[a2.version][b2.bitrate_index];
        d.nVbrNumFrames++;
        d.sum += a2;
        d.seen++;
        if (!(d.seen < d.want) && (d.pos < d.size && (d.bag[d.pos] = d.sum, d.pos++, d.seen = 0), d.pos == d.size)) {
          for (a2 = 1; a2 < d.size; a2 += 2) d.bag[a2 / 2] = d.bag[a2];
          d.want *= 2;
          d.pos /= 2;
        }
      };
      this.getVbrTag = function(a2) {
        var b2 = new VBRTagData(), d = 0;
        b2.flags = 0;
        var e = a2[d + 1] >> 3 & 1, f2 = a2[d + 2] >> 2 & 3, m2 = a2[d + 3] >> 6 & 3, p = a2[d + 2] >> 4 & 15;
        p = w.bitrate_table[e][p];
        b2.samprate = 14 == a2[d + 1] >> 4 ? w.samplerate_table[2][f2] : w.samplerate_table[e][f2];
        f2 = d = 0 != e ? 3 != m2 ? d + 36 : d + 21 : 3 != m2 ? d + 21 : d + 13;
        if (!new String(a2, f2, 4(), null).equals("Xing") && !new String(a2, f2, 4(), null).equals("Info")) return null;
        d += 4;
        b2.hId = e;
        f2 = b2.flags = c2(a2, d);
        d += 4;
        0 != (f2 & 1) && (b2.frames = c2(a2, d), d += 4);
        0 != (f2 & 2) && (b2.bytes = c2(a2, d), d += 4);
        if (0 != (f2 & 4)) {
          if (null != b2.toc) for (m2 = 0; m2 < v; m2++) b2.toc[m2] = a2[d + m2];
          d += v;
        }
        b2.vbrScale = -1;
        0 != (f2 & 8) && (b2.vbrScale = c2(a2, d), d += 4);
        b2.headersize = 72e3 * (e + 1) * p / b2.samprate;
        d += 21;
        e = a2[d + 0] << 4;
        e += a2[d + 1] >> 4;
        p = (a2[d + 1] & 15) << 8;
        p += a2[d + 2] & 255;
        if (0 > e || 3e3 < e) e = -1;
        if (0 > p || 3e3 < p) p = -1;
        b2.encDelay = e;
        b2.encPadding = p;
        return b2;
      };
      this.InitVbrTag = function(b2) {
        var e = b2.internal_flags;
        var d = 1 == b2.version ? 128 : 16e3 > b2.out_samplerate ? 32 : 64;
        b2.VBR == G.vbr_off && (d = b2.brate);
        d = 72e3 * (b2.version + 1) * d / b2.out_samplerate;
        var c3 = e.sideinfo_len + m;
        e.VBR_seek_table.TotalFrameSize = d;
        if (d < c3 || d > a) b2.bWriteVbrTag = false;
        else for (e.VBR_seek_table.nVbrNumFrames = 0, e.VBR_seek_table.nBytesWritten = 0, e.VBR_seek_table.sum = 0, e.VBR_seek_table.seen = 0, e.VBR_seek_table.want = 1, e.VBR_seek_table.pos = 0, null == e.VBR_seek_table.bag && (e.VBR_seek_table.bag = new int[400](), e.VBR_seek_table.size = 400), d = new Int8Array(a), E(b2, d), e = e.VBR_seek_table.TotalFrameSize, c3 = 0; c3 < e; ++c3) f.add_dummy_byte(b2, d[c3] & 255, 1);
      };
      this.updateMusicCRC = function(a2, b2, d, c3) {
        for (var e = 0; e < c3; ++e) a2[0] = B(b2[d + e], a2[0]);
      };
      this.getLameTagFrame = function(a2, c3) {
        var d = a2.internal_flags;
        if (!a2.bWriteVbrTag || d.Class_ID != W.LAME_ID || 0 >= d.VBR_seek_table.pos) return 0;
        if (c3.length < d.VBR_seek_table.TotalFrameSize) return d.VBR_seek_table.TotalFrameSize;
        na.fill(c3, 0, d.VBR_seek_table.TotalFrameSize, 0);
        E(a2, c3);
        var e = new Int8Array(v);
        if (a2.free_format) for (var l = 1; l < v; ++l) e[l] = 255 & 255 * l / 100;
        else {
          var m2 = d.VBR_seek_table;
          if (!(0 >= m2.pos)) for (l = 1; l < v; ++l) {
            var p = 0 | Math.floor(l / v * m2.pos);
            p > m2.pos - 1 && (p = m2.pos - 1);
            p = 0 | 256 * m2.bag[p] / m2.sum;
            255 < p && (p = 255);
            e[l] = 255 & p;
          }
        }
        p = d.sideinfo_len;
        a2.error_protection && (p -= 2);
        c3[p++] = 0;
        c3[p++] = 0;
        c3[p++] = 0;
        c3[p++] = 0;
        k(c3, p, 15);
        p += 4;
        k(c3, p, d.VBR_seek_table.nVbrNumFrames);
        p += 4;
        m2 = d.VBR_seek_table.nBytesWritten + d.VBR_seek_table.TotalFrameSize;
        k(c3, p, 0 | m2);
        p += 4;
        T.arraycopy(e, 0, c3, p, e.length);
        p += e.length;
        a2.error_protection && f.CRC_writeheader(
          d,
          c3
        );
        var r = 0;
        for (l = 0; l < p; l++) r = B(c3[l], r);
        e = p;
        l = r;
        var t = a2.internal_flags;
        p = 0;
        r = a2.encoder_delay;
        var u = a2.encoder_padding, h = 100 - 10 * a2.VBR_q - a2.quality, x = b.getLameVeryShortVersion();
        var y = [1, 5, 3, 2, 4, 0, 3];
        var A = 0 | (255 < a2.lowpassfreq / 100 + 0.5 ? 255 : a2.lowpassfreq / 100 + 0.5), z2 = 0, w2 = 0, O = a2.internal_flags.noise_shaping, F = 0, C, I = 0 != (a2.exp_nspsytune & 1);
        var Q = 0 != (a2.exp_nspsytune & 2);
        var S = C = false, ma = a2.internal_flags.nogap_total, Z = a2.internal_flags.nogap_current, L = a2.ATHtype;
        switch (a2.VBR) {
          case vbr_abr:
            var V2 = a2.VBR_mean_bitrate_kbps;
            break;
          case vbr_off:
            V2 = a2.brate;
            break;
          default:
            V2 = a2.VBR_min_bitrate_kbps;
        }
        y = 0 + (a2.VBR.ordinal() < y.length ? y[a2.VBR.ordinal()] : 0);
        t.findReplayGain && (510 < t.RadioGain && (t.RadioGain = 510), -510 > t.RadioGain && (t.RadioGain = -510), w2 = 11264, w2 = 0 <= t.RadioGain ? w2 | t.RadioGain : w2 | 512 | -t.RadioGain);
        t.findPeakSample && (z2 = Math.abs(0 | t.PeakSample / 32767 * Math.pow(2, 23) + 0.5));
        -1 != ma && (0 < Z && (S = true), Z < ma - 1 && (C = true));
        I = L + ((I ? 1 : 0) << 4) + ((Q ? 1 : 0) << 5) + ((C ? 1 : 0) << 6) + ((S ? 1 : 0) << 7);
        0 > h && (h = 0);
        switch (a2.mode) {
          case MONO:
            Q = 0;
            break;
          case STEREO:
            Q = 1;
            break;
          case DUAL_CHANNEL:
            Q = 2;
            break;
          case JOINT_STEREO:
            Q = a2.force_ms ? 4 : 3;
            break;
          default:
            Q = 7;
        }
        C = 32e3 >= a2.in_samplerate ? 0 : 48e3 == a2.in_samplerate ? 2 : 48e3 < a2.in_samplerate ? 3 : 1;
        if (a2.short_blocks == ra.short_block_forced || a2.short_blocks == ra.short_block_dispensed || -1 == a2.lowpassfreq && -1 == a2.highpassfreq || a2.scale_left < a2.scale_right || a2.scale_left > a2.scale_right || a2.disable_reservoir && 320 > a2.brate || a2.noATH || a2.ATHonly || 0 == L || 32e3 >= a2.in_samplerate) F = 1;
        O = O + (Q << 2) + (F << 5) + (C << 6);
        t = t.nMusicCRC;
        k(c3, e + p, h);
        p += 4;
        for (h = 0; 9 > h; h++) c3[e + p + h] = 255 & x.charAt(h);
        p += 9;
        c3[e + p] = 255 & y;
        p++;
        c3[e + p] = 255 & A;
        p++;
        k(c3, e + p, z2);
        p += 4;
        n(c3, e + p, w2);
        p += 2;
        n(c3, e + p, 0);
        p += 2;
        c3[e + p] = 255 & I;
        p++;
        c3[e + p] = 255 <= V2 ? 255 : 255 & V2;
        p++;
        c3[e + p] = 255 & r >> 4;
        c3[e + p + 1] = 255 & (r << 4) + (u >> 8);
        c3[e + p + 2] = 255 & u;
        p += 3;
        c3[e + p] = 255 & O;
        p++;
        c3[e + p++] = 0;
        n(c3, e + p, a2.preset);
        p += 2;
        k(c3, e + p, m2);
        p += 4;
        n(c3, e + p, t);
        p += 2;
        for (a2 = 0; a2 < p; a2++) l = B(c3[e + a2], l);
        n(c3, e + p, l);
        return d.VBR_seek_table.TotalFrameSize;
      };
      this.putVbrTag = function(b2, c3) {
        if (0 >= b2.internal_flags.VBR_seek_table.pos) return -1;
        c3.seek(c3.length());
        if (0 == c3.length()) return -1;
        c3.seek(0);
        var d = new Int8Array(10);
        c3.readFully(d);
        d = new String(d, "ISO-8859-1").startsWith("ID3") ? 0 : ((d[6] & 127) << 21 | (d[7] & 127) << 14 | (d[8] & 127) << 7 | d[9] & 127) + d.length;
        c3.seek(d);
        d = new Int8Array(a);
        b2 = getLameTagFrame(b2, d);
        if (b2 > d.length) return -1;
        if (1 > b2) return 0;
        c3.write(d, 0, b2);
        return 0;
      };
    }
    function U(c2, k, n, w2) {
      this.xlen = c2;
      this.linmax = k;
      this.table = n;
      this.hlen = w2;
    }
    function xa(c2) {
      this.bits = c2;
    }
    function yc() {
      this.setModules = function(c2, k) {
      };
    }
    function sb() {
      this.bits = this.over_SSD = this.over_count = this.max_noise = this.tot_noise = this.over_noise = 0;
    }
    function zc() {
      this.scale_right = this.scale_left = this.scale = this.out_samplerate = this.in_samplerate = this.num_channels = this.num_samples = this.class_id = 0;
      this.decode_only = this.bWriteVbrTag = this.analysis = false;
      this.quality = 0;
      this.mode = la.STEREO;
      this.write_id3tag_automatic = this.decode_on_the_fly = this.findReplayGain = this.free_format = this.force_ms = false;
      this.error_protection = this.emphasis = this.extension = this.original = this.copyright = this.compression_ratio = this.brate = 0;
      this.disable_reservoir = this.strict_ISO = false;
      this.quant_comp_short = this.quant_comp = 0;
      this.experimentalY = false;
      this.preset = this.exp_nspsytune = this.experimentalZ = 0;
      this.VBR = null;
      this.maskingadjust_short = this.maskingadjust = this.highpasswidth = this.lowpasswidth = this.highpassfreq = this.lowpassfreq = this.VBR_hard_min = this.VBR_max_bitrate_kbps = this.VBR_min_bitrate_kbps = this.VBR_mean_bitrate_kbps = this.VBR_q = this.VBR_q_frac = 0;
      this.noATH = this.ATHshort = this.ATHonly = false;
      this.athaa_sensitivity = this.athaa_loudapprox = this.athaa_type = this.ATHlower = this.ATHcurve = this.ATHtype = 0;
      this.short_blocks = null;
      this.useTemporal = false;
      this.msfix = this.interChRatio = 0;
      this.tune = false;
      this.lame_allocated_gfp = this.frameNum = this.framesize = this.encoder_padding = this.encoder_delay = this.version = this.tune_value_a = 0;
      this.internal_flags = null;
    }
    function Ac() {
      this.linprebuf = K(2 * Y.MAX_ORDER);
      this.linpre = 0;
      this.lstepbuf = K(Y.MAX_SAMPLES_PER_WINDOW + Y.MAX_ORDER);
      this.lstep = 0;
      this.loutbuf = K(Y.MAX_SAMPLES_PER_WINDOW + Y.MAX_ORDER);
      this.lout = 0;
      this.rinprebuf = K(2 * Y.MAX_ORDER);
      this.rinpre = 0;
      this.rstepbuf = K(Y.MAX_SAMPLES_PER_WINDOW + Y.MAX_ORDER);
      this.rstep = 0;
      this.routbuf = K(Y.MAX_SAMPLES_PER_WINDOW + Y.MAX_ORDER);
      this.first = this.freqindex = this.rsum = this.lsum = this.totsamp = this.sampleWindow = this.rout = 0;
      this.A = X(0 | Y.STEPS_per_dB * Y.MAX_dB);
      this.B = X(0 | Y.STEPS_per_dB * Y.MAX_dB);
    }
    function Bc(u) {
      this.quantize = u;
      this.iteration_loop = function(k, n, u2, w2) {
        var B = k.internal_flags, E = K(sa.SFBMAX), f = K(576), b = X(2), v = B.l3_side;
        var a = new xa(0);
        this.quantize.rv.ResvFrameBegin(k, a);
        a = a.bits;
        for (var m = 0; m < B.mode_gr; m++) {
          var z = this.quantize.qupvt.on_pe(k, n, b, a, m, m);
          B.mode_ext == c.MPG_MD_MS_LR && (this.quantize.ms_convert(B.l3_side, m), this.quantize.qupvt.reduce_side(b, u2[m], a, z));
          for (z = 0; z < B.channels_out; z++) {
            var e = v.tt[m][z];
            if (e.block_type != c.SHORT_TYPE) {
              var l = 0;
              l = B.PSY.mask_adjust - l;
            } else l = 0, l = B.PSY.mask_adjust_short - l;
            B.masking_lower = Math.pow(10, 0.1 * l);
            this.quantize.init_outer_loop(B, e);
            this.quantize.init_xrpow(B, e, f) && (this.quantize.qupvt.calc_xmin(k, w2[m][z], e, E), this.quantize.outer_loop(k, e, E, f, z, b[z]));
            this.quantize.iteration_finish_one(B, m, z);
          }
        }
        this.quantize.rv.ResvFrameEnd(
          B,
          a
        );
      };
    }
    function Cc() {
      this.floor = this.decay = this.adjustLimit = this.adjust = this.aaSensitivityP = this.useAdjust = 0;
      this.l = K(c.SBMAX_l);
      this.s = K(c.SBMAX_s);
      this.psfb21 = K(c.PSFB21);
      this.psfb12 = K(c.PSFB12);
      this.cb_l = K(c.CBANDS);
      this.cb_s = K(c.CBANDS);
      this.eql_w = K(c.BLKSIZE / 2);
    }
    function za(u, k, n, w2) {
      this.l = X(1 + c.SBMAX_l);
      this.s = X(1 + c.SBMAX_s);
      this.psfb21 = X(1 + c.PSFB21);
      this.psfb12 = X(1 + c.PSFB12);
      var E = this.l, B = this.s;
      4 == arguments.length && (this.arrL = arguments[0], this.arrS = arguments[1], this.arr21 = arguments[2], this.arr12 = arguments[3], T.arraycopy(this.arrL, 0, E, 0, Math.min(this.arrL.length, this.l.length)), T.arraycopy(this.arrS, 0, B, 0, Math.min(this.arrS.length, this.s.length)), T.arraycopy(this.arr21, 0, this.psfb21, 0, Math.min(this.arr21.length, this.psfb21.length)), T.arraycopy(this.arr12, 0, this.psfb12, 0, Math.min(this.arr12.length, this.psfb12.length)));
    }
    function ia() {
      function u(a2, b2) {
        b2 = E.ATHformula(b2, a2);
        return b2 = Math.pow(10, (b2 - 100) / 10 + a2.ATHlower);
      }
      function k(a2) {
        this.s = a2;
      }
      var n = null, w2 = null, E = null;
      this.setModules = function(a2, b2, d) {
        n = a2;
        w2 = b2;
        E = d;
      };
      this.IPOW20 = function(b2) {
        return a[b2];
      };
      var B = ia.IXMAX_VAL + 2, ha = ia.Q_MAX, f = ia.Q_MAX2;
      this.nr_of_sfb_block = [[[6, 5, 5, 5], [9, 9, 9, 9], [6, 9, 9, 9]], [[6, 5, 7, 3], [9, 9, 12, 6], [6, 9, 12, 6]], [[11, 10, 0, 0], [18, 18, 0, 0], [15, 18, 0, 0]], [[7, 7, 7, 0], [12, 12, 12, 0], [6, 15, 12, 0]], [[6, 6, 6, 3], [12, 9, 9, 6], [6, 12, 9, 6]], [[8, 8, 5, 0], [15, 12, 9, 0], [6, 18, 9, 0]]];
      var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
      this.pretab = b;
      this.sfBandIndex = [new za([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [
        0,
        4,
        8,
        12,
        18,
        24,
        32,
        42,
        56,
        74,
        100,
        132,
        174,
        192
      ], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 114, 136, 162, 194, 232, 278, 332, 394, 464, 540, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 52, 62, 74, 90, 110, 134, 162, 196, 238, 288, 342, 418, 576], [
        0,
        4,
        8,
        12,
        16,
        22,
        30,
        40,
        52,
        66,
        84,
        106,
        136,
        192
      ], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 4, 8, 12, 16, 20, 24, 30, 36, 42, 50, 60, 72, 88, 106, 128, 156, 190, 230, 276, 330, 384, 576], [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 54, 66, 82, 102, 126, 156, 194, 240, 296, 364, 448, 550, 576], [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [
        0,
        4,
        8,
        12,
        18,
        26,
        36,
        48,
        62,
        80,
        104,
        134,
        174,
        192
      ], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new za([0, 12, 24, 36, 48, 60, 72, 88, 108, 132, 160, 192, 232, 280, 336, 400, 476, 566, 568, 570, 572, 574, 576], [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0])];
      var v = K(ha + f + 1), a = K(ha), m = K(B), z = K(B);
      this.adj43 = z;
      this.iteration_init = function(b2) {
        var e = b2.internal_flags, d = e.l3_side;
        if (0 == e.iteration_init_init) {
          e.iteration_init_init = 1;
          d.main_data_begin = 0;
          d = b2.internal_flags.ATH.l;
          for (var g = b2.internal_flags.ATH.psfb21, q = b2.internal_flags.ATH.s, k2 = b2.internal_flags.ATH.psfb12, p = b2.internal_flags, r = b2.out_samplerate, t = 0; t < c.SBMAX_l; t++) {
            var J = p.scalefac_band.l[t], h = p.scalefac_band.l[t + 1];
            for (d[t] = Ma.MAX_VALUE; J < h; J++) {
              var x = J * r / 1152;
              x = u(b2, x);
              d[t] = Math.min(d[t], x);
            }
          }
          for (t = 0; t < c.PSFB21; t++) for (J = p.scalefac_band.psfb21[t], h = p.scalefac_band.psfb21[t + 1], g[t] = Ma.MAX_VALUE; J < h; J++) x = J * r / 1152, x = u(b2, x), g[t] = Math.min(g[t], x);
          for (t = 0; t < c.SBMAX_s; t++) {
            J = p.scalefac_band.s[t];
            h = p.scalefac_band.s[t + 1];
            for (q[t] = Ma.MAX_VALUE; J < h; J++) x = J * r / 384, x = u(b2, x), q[t] = Math.min(q[t], x);
            q[t] *= p.scalefac_band.s[t + 1] - p.scalefac_band.s[t];
          }
          for (t = 0; t < c.PSFB12; t++) {
            J = p.scalefac_band.psfb12[t];
            h = p.scalefac_band.psfb12[t + 1];
            for (k2[t] = Ma.MAX_VALUE; J < h; J++) x = J * r / 384, x = u(b2, x), k2[t] = Math.min(k2[t], x);
            k2[t] *= p.scalefac_band.s[13] - p.scalefac_band.s[12];
          }
          if (b2.noATH) {
            for (t = 0; t < c.SBMAX_l; t++) d[t] = 1e-20;
            for (t = 0; t < c.PSFB21; t++) g[t] = 1e-20;
            for (t = 0; t < c.SBMAX_s; t++) q[t] = 1e-20;
            for (t = 0; t < c.PSFB12; t++) k2[t] = 1e-20;
          }
          p.ATH.floor = 10 * Math.log10(u(b2, -1));
          m[0] = 0;
          for (d = 1; d < B; d++) m[d] = Math.pow(d, 4 / 3);
          for (d = 0; d < B - 1; d++) z[d] = d + 1 - Math.pow(0.5 * (m[d] + m[d + 1]), 0.75);
          z[d] = 0.5;
          for (d = 0; d < ha; d++) a[d] = Math.pow(2, -0.1875 * (d - 210));
          for (d = 0; d <= ha + f; d++) v[d] = Math.pow(2, 0.25 * (d - 210 - f));
          n.huffman_init(e);
          d = b2.exp_nspsytune >> 2 & 63;
          32 <= d && (d -= 64);
          g = Math.pow(10, d / 4 / 10);
          d = b2.exp_nspsytune >> 8 & 63;
          32 <= d && (d -= 64);
          q = Math.pow(10, d / 4 / 10);
          d = b2.exp_nspsytune >> 14 & 63;
          32 <= d && (d -= 64);
          k2 = Math.pow(10, d / 4 / 10);
          d = b2.exp_nspsytune >> 20 & 63;
          32 <= d && (d -= 64);
          b2 = k2 * Math.pow(10, d / 4 / 10);
          for (d = 0; d < c.SBMAX_l; d++) p = 6 >= d ? g : 13 >= d ? q : 20 >= d ? k2 : b2, e.nsPsy.longfact[d] = p;
          for (d = 0; d < c.SBMAX_s; d++) p = 5 >= d ? g : 10 >= d ? q : 11 >= d ? k2 : b2, e.nsPsy.shortfact[d] = p;
        }
      };
      this.on_pe = function(a2, b2, d, c2, f2, m2) {
        var e = a2.internal_flags, g = 0, l = X(2), q;
        g = new xa(g);
        a2 = w2.ResvMaxBits(a2, c2, g, m2);
        g = g.bits;
        var h = g + a2;
        h > da.MAX_BITS_PER_GRANULE && (h = da.MAX_BITS_PER_GRANULE);
        for (q = m2 = 0; q < e.channels_out; ++q) d[q] = Math.min(da.MAX_BITS_PER_CHANNEL, g / e.channels_out), l[q] = 0 | d[q] * b2[f2][q] / 700 - d[q], l[q] > 3 * c2 / 4 && (l[q] = 3 * c2 / 4), 0 > l[q] && (l[q] = 0), l[q] + d[q] > da.MAX_BITS_PER_CHANNEL && (l[q] = Math.max(0, da.MAX_BITS_PER_CHANNEL - d[q])), m2 += l[q];
        if (m2 > a2) for (q = 0; q < e.channels_out; ++q) l[q] = a2 * l[q] / m2;
        for (q = 0; q < e.channels_out; ++q) d[q] += l[q], a2 -= l[q];
        for (q = m2 = 0; q < e.channels_out; ++q) m2 += d[q];
        if (m2 > da.MAX_BITS_PER_GRANULE) for (q = 0; q < e.channels_out; ++q) d[q] *= da.MAX_BITS_PER_GRANULE, d[q] /= m2;
        return h;
      };
      this.reduce_side = function(a2, b2, d, c2) {
        b2 = 0.33 * (0.5 - b2) / 0.5;
        0 > b2 && (b2 = 0);
        0.5 < b2 && (b2 = 0.5);
        b2 = 0 | 0.5 * b2 * (a2[0] + a2[1]);
        b2 > da.MAX_BITS_PER_CHANNEL - a2[0] && (b2 = da.MAX_BITS_PER_CHANNEL - a2[0]);
        0 > b2 && (b2 = 0);
        125 <= a2[1] && (125 < a2[1] - b2 ? (a2[0] < d && (a2[0] += b2), a2[1] -= b2) : (a2[0] += a2[1] - 125, a2[1] = 125));
        b2 = a2[0] + a2[1];
        b2 > c2 && (a2[0] = c2 * a2[0] / b2, a2[1] = c2 * a2[1] / b2);
      };
      this.athAdjust = function(a2, b2, d) {
        b2 = aa.FAST_LOG10_X(b2, 10);
        a2 *= a2;
        var c2 = 0;
        b2 -= d;
        1e-20 < a2 && (c2 = 1 + aa.FAST_LOG10_X(a2, 10 / 90.30873362));
        0 > c2 && (c2 = 0);
        return Math.pow(10, 0.1 * (b2 * c2 + (d + 90.30873362 - 94.82444863)));
      };
      this.calc_xmin = function(a2, b2, d, f2) {
        var e = 0, g = a2.internal_flags, m2, l = 0, k2 = 0, v2 = g.ATH, h = d.xr, x = a2.VBR == G.vbr_mtrh ? 1 : 0, y = g.masking_lower;
        if (a2.VBR == G.vbr_mtrh || a2.VBR == G.vbr_mt) y = 1;
        for (m2 = 0; m2 < d.psy_lmax; m2++) {
          var A = a2.VBR == G.vbr_rh || a2.VBR == G.vbr_mtrh ? athAdjust(v2.adjust, v2.l[m2], v2.floor) : v2.adjust * v2.l[m2];
          var n2 = d.width[m2];
          var u2 = A / n2;
          var B2 = 2220446049250313e-31;
          var z2 = n2 >> 1;
          var C = 0;
          do {
            var I = h[l] * h[l];
            C += I;
            B2 += I < u2 ? I : u2;
            l++;
            I = h[l] * h[l];
            C += I;
            B2 += I < u2 ? I : u2;
            l++;
          } while (0 < --z2);
          C > A && k2++;
          m2 == c.SBPSY_l && (u2 = A * g.nsPsy.longfact[m2], B2 < u2 && (B2 = u2));
          0 != x && (A = B2);
          a2.ATHonly || (B2 = b2.en.l[m2], 0 < B2 && (u2 = C * b2.thm.l[m2] * y / B2, 0 != x && (u2 *= g.nsPsy.longfact[m2]), A < u2 && (A = u2)));
          0 != x ? f2[e++] = A : f2[e++] = A * g.nsPsy.longfact[m2];
        }
        C = 575;
        if (d.block_type != c.SHORT_TYPE) for (A = 576; 0 != A-- && qa.EQ(h[A], 0); ) C = A;
        d.max_nonzero_coeff = C;
        for (var Q = d.sfb_smin; m2 < d.psymax; Q++, m2 += 3) {
          var S;
          var w3 = a2.VBR == G.vbr_rh || a2.VBR == G.vbr_mtrh ? athAdjust(v2.adjust, v2.s[Q], v2.floor) : v2.adjust * v2.s[Q];
          n2 = d.width[m2];
          for (S = 0; 3 > S; S++) {
            C = 0;
            z2 = n2 >> 1;
            u2 = w3 / n2;
            B2 = 2220446049250313e-31;
            do
              I = h[l] * h[l], C += I, B2 += I < u2 ? I : u2, l++, I = h[l] * h[l], C += I, B2 += I < u2 ? I : u2, l++;
            while (0 < --z2);
            C > w3 && k2++;
            Q == c.SBPSY_s && (u2 = w3 * g.nsPsy.shortfact[Q], B2 < u2 && (B2 = u2));
            A = 0 != x ? B2 : w3;
            a2.ATHonly || a2.ATHshort || (B2 = b2.en.s[Q][S], 0 < B2 && (u2 = C * b2.thm.s[Q][S] * y / B2, 0 != x && (u2 *= g.nsPsy.shortfact[Q]), A < u2 && (A = u2)));
            0 != x ? f2[e++] = A : f2[e++] = A * g.nsPsy.shortfact[Q];
          }
          a2.useTemporal && (f2[e - 3] > f2[e - 3 + 1] && (f2[e - 3 + 1] += (f2[e - 3] - f2[e - 3 + 1]) * g.decay), f2[e - 3 + 1] > f2[e - 3 + 2] && (f2[e - 3 + 2] += (f2[e - 3 + 1] - f2[e - 3 + 2]) * g.decay));
        }
        return k2;
      };
      this.calc_noise_core = function(a2, b2, d, c2) {
        var e = 0, f2 = b2.s, g = a2.l3_enc;
        if (f2 > a2.count1) for (; 0 != d--; ) {
          var l = a2.xr[f2];
          f2++;
          e += l * l;
          l = a2.xr[f2];
          f2++;
          e += l * l;
        }
        else if (f2 > a2.big_values) {
          var k2 = K(2);
          k2[0] = 0;
          for (k2[1] = c2; 0 != d--; ) l = Math.abs(a2.xr[f2]) - k2[g[f2]], f2++, e += l * l, l = Math.abs(a2.xr[f2]) - k2[g[f2]], f2++, e += l * l;
        } else for (; 0 != d--; ) l = Math.abs(a2.xr[f2]) - m[g[f2]] * c2, f2++, e += l * l, l = Math.abs(a2.xr[f2]) - m[g[f2]] * c2, f2++, e += l * l;
        b2.s = f2;
        return e;
      };
      this.calc_noise = function(a2, c2, d, f2, m2) {
        var e = 0, g = 0, l, q = 0, u2 = 0, h = 0, x = -20, y = 0, A = a2.scalefac, n2 = 0;
        for (l = f2.over_SSD = 0; l < a2.psymax; l++) {
          var B2 = a2.global_gain - (A[n2++] + (0 != a2.preflag ? b[l] : 0) << a2.scalefac_scale + 1) - 8 * a2.subblock_gain[a2.window[l]];
          if (null != m2 && m2.step[l] == B2) {
            var z2 = m2.noise[l];
            y += a2.width[l];
            d[e++] = z2 / c2[g++];
            z2 = m2.noise_log[l];
          } else {
            z2 = v[B2 + ia.Q_MAX2];
            var w3 = a2.width[l] >> 1;
            y + a2.width[l] > a2.max_nonzero_coeff && (w3 = a2.max_nonzero_coeff - y + 1, w3 = 0 < w3 ? w3 >> 1 : 0);
            y = new k(y);
            z2 = this.calc_noise_core(a2, y, w3, z2);
            y = y.s;
            null != m2 && (m2.step[l] = B2, m2.noise[l] = z2);
            z2 = d[e++] = z2 / c2[g++];
            z2 = aa.FAST_LOG10(Math.max(z2, 1e-20));
            null != m2 && (m2.noise_log[l] = z2);
          }
          null != m2 && (m2.global_gain = a2.global_gain);
          h += z2;
          0 < z2 && (B2 = Math.max(0 | 10 * z2 + 0.5, 1), f2.over_SSD += B2 * B2, q++, u2 += z2);
          x = Math.max(x, z2);
        }
        f2.over_count = q;
        f2.tot_noise = h;
        f2.over_noise = u2;
        f2.max_noise = x;
        return q;
      };
      this.set_pinfo = function(a2, f2, d, g, m2) {
        var e = a2.internal_flags, l, k2, q = 0 == f2.scalefac_scale ? 0.5 : 1, v2 = f2.scalefac, h = K(sa.SFBMAX), x = K(sa.SFBMAX), y = new sb();
        calc_xmin(a2, d, f2, h);
        calc_noise(f2, h, x, y, null);
        var u2 = 0;
        var n2 = f2.sfb_lmax;
        f2.block_type != c.SHORT_TYPE && 0 == f2.mixed_block_flag && (n2 = 22);
        for (l = 0; l < n2; l++) {
          var B2 = e.scalefac_band.l[l], z2 = e.scalefac_band.l[l + 1], w3 = z2 - B2;
          for (k2 = 0; u2 < z2; u2++) k2 += f2.xr[u2] * f2.xr[u2];
          k2 /= w3;
          var C = 1e15;
          e.pinfo.en[g][m2][l] = C * k2;
          e.pinfo.xfsf[g][m2][l] = C * h[l] * x[l] / w3;
          k2 = 0 < d.en.l[l] && !a2.ATHonly ? k2 / d.en.l[l] : 0;
          e.pinfo.thr[g][m2][l] = C * Math.max(k2 * d.thm.l[l], e.ATH.l[l]);
          e.pinfo.LAMEsfb[g][m2][l] = 0;
          0 != f2.preflag && 11 <= l && (e.pinfo.LAMEsfb[g][m2][l] = -q * b[l]);
          l < c.SBPSY_l && (e.pinfo.LAMEsfb[g][m2][l] -= q * v2[l]);
        }
        if (f2.block_type == c.SHORT_TYPE) for (n2 = l, l = f2.sfb_smin; l < c.SBMAX_s; l++) {
          B2 = e.scalefac_band.s[l];
          z2 = e.scalefac_band.s[l + 1];
          w3 = z2 - B2;
          for (var I = 0; 3 > I; I++) {
            k2 = 0;
            for (C = B2; C < z2; C++) k2 += f2.xr[u2] * f2.xr[u2], u2++;
            k2 = Math.max(k2 / w3, 1e-20);
            C = 1e15;
            e.pinfo.en_s[g][m2][3 * l + I] = C * k2;
            e.pinfo.xfsf_s[g][m2][3 * l + I] = C * h[n2] * x[n2] / w3;
            k2 = 0 < d.en.s[l][I] ? k2 / d.en.s[l][I] : 0;
            if (a2.ATHonly || a2.ATHshort) k2 = 0;
            e.pinfo.thr_s[g][m2][3 * l + I] = C * Math.max(k2 * d.thm.s[l][I], e.ATH.s[l]);
            e.pinfo.LAMEsfb_s[g][m2][3 * l + I] = -2 * f2.subblock_gain[I];
            l < c.SBPSY_s && (e.pinfo.LAMEsfb_s[g][m2][3 * l + I] -= q * v2[n2]);
            n2++;
          }
        }
        e.pinfo.LAMEqss[g][m2] = f2.global_gain;
        e.pinfo.LAMEmainbits[g][m2] = f2.part2_3_length + f2.part2_length;
        e.pinfo.LAMEsfbits[g][m2] = f2.part2_length;
        e.pinfo.over[g][m2] = y.over_count;
        e.pinfo.max_noise[g][m2] = 10 * y.max_noise;
        e.pinfo.over_noise[g][m2] = 10 * y.over_noise;
        e.pinfo.tot_noise[g][m2] = 10 * y.tot_noise;
        e.pinfo.over_SSD[g][m2] = y.over_SSD;
      };
    }
    function Dc() {
      this.sfb_count1 = this.global_gain = 0;
      this.step = X(39);
      this.noise = K(39);
      this.noise_log = K(39);
    }
    function rb() {
      this.xr = K(576);
      this.l3_enc = X(576);
      this.scalefac = X(sa.SFBMAX);
      this.mixed_block_flag = this.block_type = this.scalefac_compress = this.global_gain = this.count1 = this.big_values = this.part2_3_length = this.xrpow_max = 0;
      this.table_select = X(3);
      this.subblock_gain = X(4);
      this.sfbdivide = this.psymax = this.sfbmax = this.psy_lmax = this.sfb_smin = this.sfb_lmax = this.part2_length = this.count1table_select = this.scalefac_scale = this.preflag = this.region1_count = this.region0_count = 0;
      this.width = X(sa.SFBMAX);
      this.window = X(sa.SFBMAX);
      this.count1bits = 0;
      this.sfb_partition_table = null;
      this.slen = X(4);
      this.max_nonzero_coeff = 0;
      var c2 = this;
      this.assign = function(k) {
        c2.xr = new Float32Array(k.xr);
        c2.l3_enc = new Int32Array(k.l3_enc);
        c2.scalefac = new Int32Array(k.scalefac);
        c2.xrpow_max = k.xrpow_max;
        c2.part2_3_length = k.part2_3_length;
        c2.big_values = k.big_values;
        c2.count1 = k.count1;
        c2.global_gain = k.global_gain;
        c2.scalefac_compress = k.scalefac_compress;
        c2.block_type = k.block_type;
        c2.mixed_block_flag = k.mixed_block_flag;
        c2.table_select = new Int32Array(k.table_select);
        c2.subblock_gain = new Int32Array(k.subblock_gain);
        c2.region0_count = k.region0_count;
        c2.region1_count = k.region1_count;
        c2.preflag = k.preflag;
        c2.scalefac_scale = k.scalefac_scale;
        c2.count1table_select = k.count1table_select;
        c2.part2_length = k.part2_length;
        c2.sfb_lmax = k.sfb_lmax;
        c2.sfb_smin = k.sfb_smin;
        c2.psy_lmax = k.psy_lmax;
        c2.sfbmax = k.sfbmax;
        c2.psymax = k.psymax;
        c2.sfbdivide = k.sfbdivide;
        c2.width = new Int32Array(k.width);
        c2.window = new Int32Array(k.window);
        c2.count1bits = k.count1bits;
        c2.sfb_partition_table = k.sfb_partition_table.slice(0);
        c2.slen = new Int32Array(k.slen);
        c2.max_nonzero_coeff = k.max_nonzero_coeff;
      };
    }
    function Ec() {
      function u(c2) {
        this.ordinal = c2;
      }
      function k(c2) {
        for (var b = 0; b < c2.sfbmax; b++) if (0 == c2.scalefac[b] + c2.subblock_gain[c2.window[b]]) return false;
        return true;
      }
      var n;
      this.rv = null;
      var w2;
      this.qupvt = null;
      var E, B = new yc(), ha;
      this.setModules = function(c2, b, k2, a) {
        n = c2;
        this.rv = w2 = b;
        this.qupvt = E = k2;
        ha = a;
        B.setModules(E, ha);
      };
      this.ms_convert = function(c2, b) {
        for (var f = 0; 576 > f; ++f) {
          var a = c2.tt[b][0].xr[f], m = c2.tt[b][1].xr[f];
          c2.tt[b][0].xr[f] = 0.5 * (a + m) * aa.SQRT2;
          c2.tt[b][1].xr[f] = 0.5 * (a - m) * aa.SQRT2;
        }
      };
      this.init_xrpow = function(c2, b, k2) {
        var a = 0 | b.max_nonzero_coeff;
        b.xrpow_max = 0;
        na.fill(k2, a, 576, 0);
        for (var f, v = f = 0; v <= a; ++v) {
          var e = Math.abs(b.xr[v]);
          f += e;
          k2[v] = Math.sqrt(e * Math.sqrt(e));
          k2[v] > b.xrpow_max && (b.xrpow_max = k2[v]);
        }
        if (1e-20 < f) {
          k2 = 0;
          0 != (c2.substep_shaping & 2) && (k2 = 1);
          for (a = 0; a < b.psymax; a++) c2.pseudohalf[a] = k2;
          return true;
        }
        na.fill(b.l3_enc, 0, 576, 0);
        return false;
      };
      this.init_outer_loop = function(f, b) {
        b.part2_3_length = 0;
        b.big_values = 0;
        b.count1 = 0;
        b.global_gain = 210;
        b.scalefac_compress = 0;
        b.table_select[0] = 0;
        b.table_select[1] = 0;
        b.table_select[2] = 0;
        b.subblock_gain[0] = 0;
        b.subblock_gain[1] = 0;
        b.subblock_gain[2] = 0;
        b.subblock_gain[3] = 0;
        b.region0_count = 0;
        b.region1_count = 0;
        b.preflag = 0;
        b.scalefac_scale = 0;
        b.count1table_select = 0;
        b.part2_length = 0;
        b.sfb_lmax = c.SBPSY_l;
        b.sfb_smin = c.SBPSY_s;
        b.psy_lmax = f.sfb21_extra ? c.SBMAX_l : c.SBPSY_l;
        b.psymax = b.psy_lmax;
        b.sfbmax = b.sfb_lmax;
        b.sfbdivide = 11;
        for (var k2 = 0; k2 < c.SBMAX_l; k2++) b.width[k2] = f.scalefac_band.l[k2 + 1] - f.scalefac_band.l[k2], b.window[k2] = 3;
        if (b.block_type == c.SHORT_TYPE) {
          var a = K(576);
          b.sfb_smin = 0;
          b.sfb_lmax = 0;
          0 != b.mixed_block_flag && (b.sfb_smin = 3, b.sfb_lmax = 2 * f.mode_gr + 4);
          b.psymax = b.sfb_lmax + 3 * ((f.sfb21_extra ? c.SBMAX_s : c.SBPSY_s) - b.sfb_smin);
          b.sfbmax = b.sfb_lmax + 3 * (c.SBPSY_s - b.sfb_smin);
          b.sfbdivide = b.sfbmax - 18;
          b.psy_lmax = b.sfb_lmax;
          var m = f.scalefac_band.l[b.sfb_lmax];
          T.arraycopy(b.xr, 0, a, 0, 576);
          for (k2 = b.sfb_smin; k2 < c.SBMAX_s; k2++) for (var n2 = f.scalefac_band.s[k2], e = f.scalefac_band.s[k2 + 1], l = 0; 3 > l; l++) for (var d = n2; d < e; d++) b.xr[m++] = a[3 * d + l];
          a = b.sfb_lmax;
          for (k2 = b.sfb_smin; k2 < c.SBMAX_s; k2++) b.width[a] = b.width[a + 1] = b.width[a + 2] = f.scalefac_band.s[k2 + 1] - f.scalefac_band.s[k2], b.window[a] = 0, b.window[a + 1] = 1, b.window[a + 2] = 2, a += 3;
        }
        b.count1bits = 0;
        b.sfb_partition_table = E.nr_of_sfb_block[0][0];
        b.slen[0] = 0;
        b.slen[1] = 0;
        b.slen[2] = 0;
        b.slen[3] = 0;
        b.max_nonzero_coeff = 575;
        na.fill(b.scalefac, 0);
        k2 = f.ATH;
        a = b.xr;
        if (b.block_type != c.SHORT_TYPE) for (b = false, m = c.PSFB21 - 1; 0 <= m && !b; m--) for (n2 = f.scalefac_band.psfb21[m], e = f.scalefac_band.psfb21[m + 1], l = E.athAdjust(k2.adjust, k2.psfb21[m], k2.floor), 1e-12 < f.nsPsy.longfact[21] && (l *= f.nsPsy.longfact[21]), --e; e >= n2; e--) if (Math.abs(a[e]) < l) a[e] = 0;
        else {
          b = true;
          break;
        }
        else for (l = 0; 3 > l; l++) for (b = false, m = c.PSFB12 - 1; 0 <= m && !b; m--) for (n2 = 3 * f.scalefac_band.s[12] + (f.scalefac_band.s[13] - f.scalefac_band.s[12]) * l + (f.scalefac_band.psfb12[m] - f.scalefac_band.psfb12[0]), e = n2 + (f.scalefac_band.psfb12[m + 1] - f.scalefac_band.psfb12[m]), d = E.athAdjust(k2.adjust, k2.psfb12[m], k2.floor), 1e-12 < f.nsPsy.shortfact[12] && (d *= f.nsPsy.shortfact[12]), --e; e >= n2; e--) if (Math.abs(a[e]) < d) a[e] = 0;
        else {
          b = true;
          break;
        }
      };
      u.BINSEARCH_NONE = new u(0);
      u.BINSEARCH_UP = new u(1);
      u.BINSEARCH_DOWN = new u(2);
      this.trancate_smallspectrums = function(f, b, k2, a) {
        var m = K(sa.SFBMAX);
        if ((0 != (f.substep_shaping & 4) || b.block_type != c.SHORT_TYPE) && 0 == (f.substep_shaping & 128)) {
          E.calc_noise(b, k2, m, new sb(), null);
          for (var n2 = 0; 576 > n2; n2++) {
            var e = 0;
            0 != b.l3_enc[n2] && (e = Math.abs(b.xr[n2]));
            a[n2] = e;
          }
          n2 = 0;
          e = 8;
          b.block_type == c.SHORT_TYPE && (e = 6);
          do {
            var l, d, g = b.width[e];
            n2 += g;
            if (!(1 <= m[e] || (na.sort(a, n2 - g, g), qa.EQ(a[n2 - 1], 0)))) {
              var q = (1 - m[e]) * k2[e];
              var v = l = 0;
              do {
                for (d = 1; v + d < g && !qa.NEQ(a[v + n2 - g], a[v + n2 + d - g]); d++) ;
                var p = a[v + n2 - g] * a[v + n2 - g] * d;
                if (q < p) {
                  0 != v && (l = a[v + n2 - g - 1]);
                  break;
                }
                q -= p;
                v += d;
              } while (v < g);
              if (!qa.EQ(l, 0)) {
                do
                  Math.abs(b.xr[n2 - g]) <= l && (b.l3_enc[n2 - g] = 0);
                while (0 < --g);
              }
            }
          } while (++e < b.psymax);
          b.part2_3_length = ha.noquant_count_bits(f, b, null);
        }
      };
      this.outer_loop = function(f, b, n2, a, m, B2) {
        var e = f.internal_flags, l = new rb(), d = K(576), g = K(sa.SFBMAX), q = new sb(), v = new Dc(), p = 9999999, r = false, t = false, w3 = 0, h, x = e.CurrentStep[m], y = false, A = e.OldValue[m];
        var z = u.BINSEARCH_NONE;
        b.global_gain = A;
        for (h = B2 - b.part2_length; ; ) {
          var H = ha.count_bits(e, a, b, null);
          if (1 == x || H == h) break;
          H > h ? (z == u.BINSEARCH_DOWN && (y = true), y && (x /= 2), z = u.BINSEARCH_UP, H = x) : (z == u.BINSEARCH_UP && (y = true), y && (x /= 2), z = u.BINSEARCH_DOWN, H = -x);
          b.global_gain += H;
          0 > b.global_gain && (b.global_gain = 0, y = true);
          255 < b.global_gain && (b.global_gain = 255, y = true);
        }
        for (; H > h && 255 > b.global_gain; ) b.global_gain++, H = ha.count_bits(e, a, b, null);
        e.CurrentStep[m] = 4 <= A - b.global_gain ? 4 : 2;
        e.OldValue[m] = b.global_gain;
        b.part2_3_length = H;
        if (0 == e.noise_shaping) return 100;
        E.calc_noise(b, n2, g, q, v);
        q.bits = b.part2_3_length;
        l.assign(b);
        m = 0;
        for (T.arraycopy(a, 0, d, 0, 576); !r; ) {
          do {
            h = new sb();
            y = 255;
            x = 0 != (e.substep_shaping & 2) ? 20 : 3;
            if (e.sfb21_extra) {
              if (1 < g[l.sfbmax]) break;
              if (l.block_type == c.SHORT_TYPE && (1 < g[l.sfbmax + 1] || 1 < g[l.sfbmax + 2])) break;
            }
            A = l;
            H = a;
            z = f.internal_flags;
            var O = A, F = g, C = H, I = f.internal_flags;
            var Q = 0 == O.scalefac_scale ? 1.2968395546510096 : 1.6817928305074292;
            for (var S = 0, ma = 0; ma < O.sfbmax; ma++) S < F[ma] && (S = F[ma]);
            ma = I.noise_shaping_amp;
            3 == ma && (ma = t ? 2 : 1);
            switch (ma) {
              case 2:
                break;
              case 1:
                S = 1 < S ? Math.pow(S, 0.5) : 0.95 * S;
                break;
              default:
                S = 1 < S ? 1 : 0.95 * S;
            }
            var Z = 0;
            for (ma = 0; ma < O.sfbmax; ma++) {
              var L = O.width[ma];
              Z += L;
              if (!(F[ma] < S)) {
                if (0 != (I.substep_shaping & 2) && (I.pseudohalf[ma] = 0 == I.pseudohalf[ma] ? 1 : 0, 0 == I.pseudohalf[ma] && 2 == I.noise_shaping_amp)) break;
                O.scalefac[ma]++;
                for (L = -L; 0 > L; L++) C[Z + L] *= Q, C[Z + L] > O.xrpow_max && (O.xrpow_max = C[Z + L]);
                if (2 == I.noise_shaping_amp) break;
              }
            }
            if (Q = k(A)) A = false;
            else if (Q = 2 == z.mode_gr ? ha.scale_bitcount(A) : ha.scale_bitcount_lsf(z, A)) {
              if (1 < z.noise_shaping) {
                if (na.fill(z.pseudohalf, 0), 0 == A.scalefac_scale) {
                  Q = A;
                  for (F = O = 0; F < Q.sfbmax; F++) {
                    I = Q.width[F];
                    C = Q.scalefac[F];
                    0 != Q.preflag && (C += E.pretab[F]);
                    O += I;
                    if (0 != (C & 1)) for (C++, I = -I; 0 > I; I++) H[O + I] *= 1.2968395546510096, H[O + I] > Q.xrpow_max && (Q.xrpow_max = H[O + I]);
                    Q.scalefac[F] = C >> 1;
                  }
                  Q.preflag = 0;
                  Q.scalefac_scale = 1;
                  Q = false;
                } else if (A.block_type == c.SHORT_TYPE && 0 < z.subblock_gain) {
                  b: {
                    Q = z;
                    O = A;
                    F = H;
                    C = O.scalefac;
                    for (H = 0; H < O.sfb_lmax; H++) if (16 <= C[H]) {
                      H = true;
                      break b;
                    }
                    for (I = 0; 3 > I; I++) {
                      ma = S = 0;
                      for (H = O.sfb_lmax + I; H < O.sfbdivide; H += 3) S < C[H] && (S = C[H]);
                      for (; H < O.sfbmax; H += 3) ma < C[H] && (ma = C[H]);
                      if (!(16 > S && 8 > ma)) {
                        if (7 <= O.subblock_gain[I]) {
                          H = true;
                          break b;
                        }
                        O.subblock_gain[I]++;
                        S = Q.scalefac_band.l[O.sfb_lmax];
                        for (H = O.sfb_lmax + I; H < O.sfbmax; H += 3) if (ma = O.width[H], Z = C[H], Z -= 4 >> O.scalefac_scale, 0 <= Z) C[H] = Z, S += 3 * ma;
                        else {
                          C[H] = 0;
                          Z = E.IPOW20(210 + (Z << O.scalefac_scale + 1));
                          S += ma * (I + 1);
                          for (L = -ma; 0 > L; L++) F[S + L] *= Z, F[S + L] > O.xrpow_max && (O.xrpow_max = F[S + L]);
                          S += ma * (3 - I - 1);
                        }
                        Z = E.IPOW20(202);
                        S += O.width[H] * (I + 1);
                        for (L = -O.width[H]; 0 > L; L++) F[S + L] *= Z, F[S + L] > O.xrpow_max && (O.xrpow_max = F[S + L]);
                      }
                    }
                    H = false;
                  }
                  Q = H || k(A);
                }
              }
              Q || (Q = 2 == z.mode_gr ? ha.scale_bitcount(A) : ha.scale_bitcount_lsf(
                z,
                A
              ));
              A = !Q;
            } else A = true;
            if (!A) break;
            0 != l.scalefac_scale && (y = 254);
            A = B2 - l.part2_length;
            if (0 >= A) break;
            for (; (l.part2_3_length = ha.count_bits(e, a, l, v)) > A && l.global_gain <= y; ) l.global_gain++;
            if (l.global_gain > y) break;
            if (0 == q.over_count) {
              for (; (l.part2_3_length = ha.count_bits(e, a, l, v)) > p && l.global_gain <= y; ) l.global_gain++;
              if (l.global_gain > y) break;
            }
            E.calc_noise(l, n2, g, h, v);
            h.bits = l.part2_3_length;
            z = b.block_type != c.SHORT_TYPE ? f.quant_comp : f.quant_comp_short;
            y = q;
            A = h;
            Q = l;
            H = g;
            switch (z) {
              default:
              case 9:
                0 < y.over_count ? (z = A.over_SSD <= y.over_SSD, A.over_SSD == y.over_SSD && (z = A.bits < y.bits)) : z = 0 > A.max_noise && 10 * A.max_noise + A.bits <= 10 * y.max_noise + y.bits;
                break;
              case 0:
                z = A.over_count < y.over_count || A.over_count == y.over_count && A.over_noise < y.over_noise || A.over_count == y.over_count && qa.EQ(A.over_noise, y.over_noise) && A.tot_noise < y.tot_noise;
                break;
              case 8:
                z = A;
                F = 1e-37;
                for (O = 0; O < Q.psymax; O++) C = H[O], C = aa.FAST_LOG10(0.368 + 0.632 * C * C * C), F += C;
                z.max_noise = Math.max(1e-20, F);
              case 1:
                z = A.max_noise < y.max_noise;
                break;
              case 2:
                z = A.tot_noise < y.tot_noise;
                break;
              case 3:
                z = A.tot_noise < y.tot_noise && A.max_noise < y.max_noise;
                break;
              case 4:
                z = 0 >= A.max_noise && 0.2 < y.max_noise || 0 >= A.max_noise && 0 > y.max_noise && y.max_noise > A.max_noise - 0.2 && A.tot_noise < y.tot_noise || 0 >= A.max_noise && 0 < y.max_noise && y.max_noise > A.max_noise - 0.2 && A.tot_noise < y.tot_noise + y.over_noise || 0 < A.max_noise && -0.05 < y.max_noise && y.max_noise > A.max_noise - 0.1 && A.tot_noise + A.over_noise < y.tot_noise + y.over_noise || 0 < A.max_noise && -0.1 < y.max_noise && y.max_noise > A.max_noise - 0.15 && A.tot_noise + A.over_noise + A.over_noise < y.tot_noise + y.over_noise + y.over_noise;
                break;
              case 5:
                z = A.over_noise < y.over_noise || qa.EQ(A.over_noise, y.over_noise) && A.tot_noise < y.tot_noise;
                break;
              case 6:
                z = A.over_noise < y.over_noise || qa.EQ(A.over_noise, y.over_noise) && (A.max_noise < y.max_noise || qa.EQ(A.max_noise, y.max_noise) && A.tot_noise <= y.tot_noise);
                break;
              case 7:
                z = A.over_count < y.over_count || A.over_noise < y.over_noise;
            }
            0 == y.over_count && (z = z && A.bits < y.bits);
            z = z ? 1 : 0;
            if (0 != z) p = b.part2_3_length, q = h, b.assign(l), m = 0, T.arraycopy(a, 0, d, 0, 576);
            else if (0 == e.full_outer_loop) {
              if (++m > x && 0 == q.over_count) break;
              if (3 == e.noise_shaping_amp && t && 30 < m) break;
              if (3 == e.noise_shaping_amp && t && 15 < l.global_gain - w3) break;
            }
          } while (255 > l.global_gain + l.scalefac_scale);
          3 == e.noise_shaping_amp ? t ? r = true : (l.assign(b), T.arraycopy(d, 0, a, 0, 576), m = 0, w3 = l.global_gain, t = true) : r = true;
        }
        f.VBR == G.vbr_rh || f.VBR == G.vbr_mtrh ? T.arraycopy(d, 0, a, 0, 576) : 0 != (e.substep_shaping & 1) && trancate_smallspectrums(e, b, n2, a);
        return q.over_count;
      };
      this.iteration_finish_one = function(c2, b, k2) {
        var a = c2.l3_side, f = a.tt[b][k2];
        ha.best_scalefac_store(c2, b, k2, a);
        1 == c2.use_best_huffman && ha.best_huffman_divide(c2, f);
        w2.ResvAdjust(c2, f);
      };
      this.VBR_encode_granule = function(c2, b, k2, a, m, n2, e) {
        var f = c2.internal_flags, d = new rb(), g = K(576), q = e, v = (e + n2) / 2, p = 0, r = f.sfb21_extra;
        na.fill(d.l3_enc, 0);
        do {
          f.sfb21_extra = v > q - 42 ? false : r;
          var t = outer_loop(c2, b, k2, a, m, v);
          0 >= t ? (p = 1, e = b.part2_3_length, d.assign(b), T.arraycopy(a, 0, g, 0, 576), e -= 32, t = e - n2, v = (e + n2) / 2) : (n2 = v + 32, t = e - n2, v = (e + n2) / 2, 0 != p && (p = 2, b.assign(d), T.arraycopy(g, 0, a, 0, 576)));
        } while (12 < t);
        f.sfb21_extra = r;
        2 == p && T.arraycopy(d.l3_enc, 0, b.l3_enc, 0, 576);
      };
      this.get_framebits = function(c2, b) {
        var f = c2.internal_flags;
        f.bitrate_index = f.VBR_min_bitrate;
        n.getframebits(c2);
        f.bitrate_index = 1;
        var a = n.getframebits(c2);
        for (var m = 1; m <= f.VBR_max_bitrate; m++) f.bitrate_index = m, a = new xa(a), b[m] = w2.ResvFrameBegin(c2, a), a = a.bits;
      };
      this.VBR_old_prepare = function(f, b, k2, a, m, n2, e, l, d) {
        var g = f.internal_flags, q = 1, v = 0;
        g.bitrate_index = g.VBR_max_bitrate;
        var p = w2.ResvFrameBegin(f, new xa(0)) / g.mode_gr;
        get_framebits(f, n2);
        for (var r = 0; r < g.mode_gr; r++) {
          var t = E.on_pe(f, b, l[r], p, r, 0);
          g.mode_ext == c.MPG_MD_MS_LR && (ms_convert(g.l3_side, r), E.reduce_side(l[r], k2[r], p, t));
          for (t = 0; t < g.channels_out; ++t) {
            var u2 = g.l3_side.tt[r][t];
            if (u2.block_type != c.SHORT_TYPE) {
              var h = 1.28 / (1 + Math.exp(3.5 - b[r][t] / 300)) - 0.05;
              h = g.PSY.mask_adjust - h;
            } else h = 2.56 / (1 + Math.exp(3.5 - b[r][t] / 300)) - 0.14, h = g.PSY.mask_adjust_short - h;
            g.masking_lower = Math.pow(10, 0.1 * h);
            init_outer_loop(g, u2);
            d[r][t] = E.calc_xmin(f, a[r][t], u2, m[r][t]);
            0 != d[r][t] && (q = 0);
            e[r][t] = 126;
            v += l[r][t];
          }
        }
        for (r = 0; r < g.mode_gr; r++) for (t = 0; t < g.channels_out; t++) v > n2[g.VBR_max_bitrate] && (l[r][t] *= n2[g.VBR_max_bitrate], l[r][t] /= v), e[r][t] > l[r][t] && (e[r][t] = l[r][t]);
        return q;
      };
      this.bitpressure_strategy = function(f, b, k2, a) {
        for (var m = 0; m < f.mode_gr; m++) for (var n2 = 0; n2 < f.channels_out; n2++) {
          for (var e = f.l3_side.tt[m][n2], l = b[m][n2], d = 0, g = 0; g < e.psy_lmax; g++) l[d++] *= 1 + 0.029 * g * g / c.SBMAX_l / c.SBMAX_l;
          if (e.block_type == c.SHORT_TYPE) for (g = e.sfb_smin; g < c.SBMAX_s; g++) l[d++] *= 1 + 0.029 * g * g / c.SBMAX_s / c.SBMAX_s, l[d++] *= 1 + 0.029 * g * g / c.SBMAX_s / c.SBMAX_s, l[d++] *= 1 + 0.029 * g * g / c.SBMAX_s / c.SBMAX_s;
          a[m][n2] = 0 | Math.max(
            k2[m][n2],
            0.9 * a[m][n2]
          );
        }
      };
      this.VBR_new_prepare = function(f, b, k2, a, m, n2) {
        var e = f.internal_flags, l = 1, d = 0, g = 0;
        if (f.free_format) {
          e.bitrate_index = 0;
          d = new xa(d);
          var q = w2.ResvFrameBegin(f, d);
          d = d.bits;
          m[0] = q;
        } else e.bitrate_index = e.VBR_max_bitrate, d = new xa(d), w2.ResvFrameBegin(f, d), d = d.bits, get_framebits(f, m), q = m[e.VBR_max_bitrate];
        for (m = 0; m < e.mode_gr; m++) {
          E.on_pe(f, b, n2[m], d, m, 0);
          e.mode_ext == c.MPG_MD_MS_LR && ms_convert(e.l3_side, m);
          for (var v = 0; v < e.channels_out; ++v) {
            var p = e.l3_side.tt[m][v];
            e.masking_lower = Math.pow(10, 0.1 * e.PSY.mask_adjust);
            init_outer_loop(e, p);
            0 != E.calc_xmin(f, k2[m][v], p, a[m][v]) && (l = 0);
            g += n2[m][v];
          }
        }
        for (m = 0; m < e.mode_gr; m++) for (v = 0; v < e.channels_out; v++) g > q && (n2[m][v] *= q, n2[m][v] /= g);
        return l;
      };
      this.calc_target_bits = function(f, b, k2, a, m, u2) {
        var e = f.internal_flags, l = e.l3_side;
        e.bitrate_index = e.VBR_max_bitrate;
        var d = new xa(0);
        u2[0] = w2.ResvFrameBegin(f, d);
        e.bitrate_index = 1;
        d = n.getframebits(f) - 8 * e.sideinfo_len;
        m[0] = d / (e.mode_gr * e.channels_out);
        d = f.VBR_mean_bitrate_kbps * f.framesize * 1e3;
        0 != (e.substep_shaping & 1) && (d *= 1.09);
        d /= f.out_samplerate;
        d -= 8 * e.sideinfo_len;
        d /= e.mode_gr * e.channels_out;
        var g = 0.93 + 0.07 * (11 - f.compression_ratio) / 5.5;
        0.9 > g && (g = 0.9);
        1 < g && (g = 1);
        for (f = 0; f < e.mode_gr; f++) {
          var q = 0;
          for (m = 0; m < e.channels_out; m++) {
            a[f][m] = int(g * d);
            if (700 < b[f][m]) {
              var v = int((b[f][m] - 700) / 1.4), p = l.tt[f][m];
              a[f][m] = int(g * d);
              p.block_type == c.SHORT_TYPE && v < d / 2 && (v = d / 2);
              v > 3 * d / 2 ? v = 3 * d / 2 : 0 > v && (v = 0);
              a[f][m] += v;
            }
            a[f][m] > da.MAX_BITS_PER_CHANNEL && (a[f][m] = da.MAX_BITS_PER_CHANNEL);
            q += a[f][m];
          }
          if (q > da.MAX_BITS_PER_GRANULE) for (m = 0; m < e.channels_out; ++m) a[f][m] *= da.MAX_BITS_PER_GRANULE, a[f][m] /= q;
        }
        if (e.mode_ext == c.MPG_MD_MS_LR) for (f = 0; f < e.mode_gr; f++) E.reduce_side(a[f], k2[f], d * e.channels_out, da.MAX_BITS_PER_GRANULE);
        for (f = b = 0; f < e.mode_gr; f++) for (m = 0; m < e.channels_out; m++) a[f][m] > da.MAX_BITS_PER_CHANNEL && (a[f][m] = da.MAX_BITS_PER_CHANNEL), b += a[f][m];
        if (b > u2[0]) for (f = 0; f < e.mode_gr; f++) for (m = 0; m < e.channels_out; m++) a[f][m] *= u2[0], a[f][m] /= b;
      };
    }
    function Fc() {
      function u(b, c2, a) {
        for (var f2 = 10, n2 = c2 + 238 - 14 - 286, e = -15; 0 > e; e++) {
          var l = k[f2 + -10];
          var d = b[n2 + -224] * l;
          var g = b[c2 + 224] * l;
          l = k[f2 + -9];
          d += b[n2 + -160] * l;
          g += b[c2 + 160] * l;
          l = k[f2 + -8];
          d += b[n2 + -96] * l;
          g += b[c2 + 96] * l;
          l = k[f2 + -7];
          d += b[n2 + -32] * l;
          g += b[c2 + 32] * l;
          l = k[f2 + -6];
          d += b[n2 + 32] * l;
          g += b[c2 + -32] * l;
          l = k[f2 + -5];
          d += b[n2 + 96] * l;
          g += b[c2 + -96] * l;
          l = k[f2 + -4];
          d += b[n2 + 160] * l;
          g += b[c2 + -160] * l;
          l = k[f2 + -3];
          d += b[n2 + 224] * l;
          g += b[c2 + -224] * l;
          l = k[f2 + -2];
          d += b[c2 + -256] * l;
          g -= b[n2 + 256] * l;
          l = k[f2 + -1];
          d += b[c2 + -192] * l;
          g -= b[n2 + 192] * l;
          l = k[f2 + 0];
          d += b[c2 + -128] * l;
          g -= b[n2 + 128] * l;
          l = k[f2 + 1];
          d += b[c2 + -64] * l;
          g -= b[n2 + 64] * l;
          l = k[f2 + 2];
          d += b[c2 + 0] * l;
          g -= b[n2 + 0] * l;
          l = k[f2 + 3];
          d += b[c2 + 64] * l;
          g -= b[n2 + -64] * l;
          l = k[f2 + 4];
          d += b[c2 + 128] * l;
          g -= b[n2 + -128] * l;
          l = k[f2 + 5];
          d += b[c2 + 192] * l;
          g -= b[n2 + -192] * l;
          d *= k[f2 + 6];
          l = g - d;
          a[30 + 2 * e] = g + d;
          a[31 + 2 * e] = k[f2 + 7] * l;
          f2 += 18;
          c2--;
          n2++;
        }
        g = b[c2 + -16] * k[f2 + -10];
        d = b[c2 + -32] * k[f2 + -2];
        g += (b[c2 + -48] - b[c2 + 16]) * k[f2 + -9];
        d += b[c2 + -96] * k[f2 + -1];
        g += (b[c2 + -80] + b[c2 + 48]) * k[f2 + -8];
        d += b[c2 + -160] * k[f2 + 0];
        g += (b[c2 + -112] - b[c2 + 80]) * k[f2 + -7];
        d += b[c2 + -224] * k[f2 + 1];
        g += (b[c2 + -144] + b[c2 + 112]) * k[f2 + -6];
        d -= b[c2 + 32] * k[f2 + 2];
        g += (b[c2 + -176] - b[c2 + 144]) * k[f2 + -5];
        d -= b[c2 + 96] * k[f2 + 3];
        g += (b[c2 + -208] + b[c2 + 176]) * k[f2 + -4];
        d -= b[c2 + 160] * k[f2 + 4];
        g += (b[c2 + -240] - b[c2 + 208]) * k[f2 + -3];
        d -= b[c2 + 224];
        b = d - g;
        c2 = d + g;
        g = a[14];
        d = a[15] - g;
        a[31] = c2 + g;
        a[30] = b + d;
        a[15] = b - d;
        a[14] = c2 - g;
        d = a[28] - a[0];
        a[0] += a[28];
        a[28] = d * k[f2 + -36 + 7];
        d = a[29] - a[1];
        a[1] += a[29];
        a[29] = d * k[f2 + -36 + 7];
        d = a[26] - a[2];
        a[2] += a[26];
        a[26] = d * k[f2 + -72 + 7];
        d = a[27] - a[3];
        a[3] += a[27];
        a[27] = d * k[f2 + -72 + 7];
        d = a[24] - a[4];
        a[4] += a[24];
        a[24] = d * k[f2 + -108 + 7];
        d = a[25] - a[5];
        a[5] += a[25];
        a[25] = d * k[f2 + -108 + 7];
        d = a[22] - a[6];
        a[6] += a[22];
        a[22] = d * aa.SQRT2;
        d = a[23] - a[7];
        a[7] += a[23];
        a[23] = d * aa.SQRT2 - a[7];
        a[7] -= a[6];
        a[22] -= a[7];
        a[23] -= a[22];
        d = a[6];
        a[6] = a[31] - d;
        a[31] += d;
        d = a[7];
        a[7] = a[30] - d;
        a[30] += d;
        d = a[22];
        a[22] = a[15] - d;
        a[15] += d;
        d = a[23];
        a[23] = a[14] - d;
        a[14] += d;
        d = a[20] - a[8];
        a[8] += a[20];
        a[20] = d * k[f2 + -180 + 7];
        d = a[21] - a[9];
        a[9] += a[21];
        a[21] = d * k[f2 + -180 + 7];
        d = a[18] - a[10];
        a[10] += a[18];
        a[18] = d * k[f2 + -216 + 7];
        d = a[19] - a[11];
        a[11] += a[19];
        a[19] = d * k[f2 + -216 + 7];
        d = a[16] - a[12];
        a[12] += a[16];
        a[16] = d * k[f2 + -252 + 7];
        d = a[17] - a[13];
        a[13] += a[17];
        a[17] = d * k[f2 + -252 + 7];
        d = -a[20] + a[24];
        a[20] += a[24];
        a[24] = d * k[f2 + -216 + 7];
        d = -a[21] + a[25];
        a[21] += a[25];
        a[25] = d * k[f2 + -216 + 7];
        d = a[4] - a[8];
        a[4] += a[8];
        a[8] = d * k[f2 + -216 + 7];
        d = a[5] - a[9];
        a[5] += a[9];
        a[9] = d * k[f2 + -216 + 7];
        d = a[0] - a[12];
        a[0] += a[12];
        a[12] = d * k[f2 + -72 + 7];
        d = a[1] - a[13];
        a[1] += a[13];
        a[13] = d * k[f2 + -72 + 7];
        d = a[16] - a[28];
        a[16] += a[28];
        a[28] = d * k[f2 + -72 + 7];
        d = -a[17] + a[29];
        a[17] += a[29];
        a[29] = d * k[f2 + -72 + 7];
        d = aa.SQRT2 * (a[2] - a[10]);
        a[2] += a[10];
        a[10] = d;
        d = aa.SQRT2 * (a[3] - a[11]);
        a[3] += a[11];
        a[11] = d;
        d = aa.SQRT2 * (-a[18] + a[26]);
        a[18] += a[26];
        a[26] = d - a[18];
        d = aa.SQRT2 * (-a[19] + a[27]);
        a[19] += a[27];
        a[27] = d - a[19];
        d = a[2];
        a[19] -= a[3];
        a[3] -= d;
        a[2] = a[31] - d;
        a[31] += d;
        d = a[3];
        a[11] -= a[19];
        a[18] -= d;
        a[3] = a[30] - d;
        a[30] += d;
        d = a[18];
        a[27] -= a[11];
        a[19] -= d;
        a[18] = a[15] - d;
        a[15] += d;
        d = a[19];
        a[10] -= d;
        a[19] = a[14] - d;
        a[14] += d;
        d = a[10];
        a[11] -= d;
        a[10] = a[23] - d;
        a[23] += d;
        d = a[11];
        a[26] -= d;
        a[11] = a[22] - d;
        a[22] += d;
        d = a[26];
        a[27] -= d;
        a[26] = a[7] - d;
        a[7] += d;
        d = a[27];
        a[27] = a[6] - d;
        a[6] += d;
        d = aa.SQRT2 * (a[0] - a[4]);
        a[0] += a[4];
        a[4] = d;
        d = aa.SQRT2 * (a[1] - a[5]);
        a[1] += a[5];
        a[5] = d;
        d = aa.SQRT2 * (a[16] - a[20]);
        a[16] += a[20];
        a[20] = d;
        d = aa.SQRT2 * (a[17] - a[21]);
        a[17] += a[21];
        a[21] = d;
        d = -aa.SQRT2 * (a[8] - a[12]);
        a[8] += a[12];
        a[12] = d - a[8];
        d = -aa.SQRT2 * (a[9] - a[13]);
        a[9] += a[13];
        a[13] = d - a[9];
        d = -aa.SQRT2 * (a[25] - a[29]);
        a[25] += a[29];
        a[29] = d - a[25];
        d = -aa.SQRT2 * (a[24] + a[28]);
        a[24] -= a[28];
        a[28] = d - a[24];
        d = a[24] - a[16];
        a[24] = d;
        d = a[20] - d;
        a[20] = d;
        d = a[28] - d;
        a[28] = d;
        d = a[25] - a[17];
        a[25] = d;
        d = a[21] - d;
        a[21] = d;
        d = a[29] - d;
        a[29] = d;
        d = a[17] - a[1];
        a[17] = d;
        d = a[9] - d;
        a[9] = d;
        d = a[25] - d;
        a[25] = d;
        d = a[5] - d;
        a[5] = d;
        d = a[21] - d;
        a[21] = d;
        d = a[13] - d;
        a[13] = d;
        d = a[29] - d;
        a[29] = d;
        d = a[1] - a[0];
        a[1] = d;
        d = a[16] - d;
        a[16] = d;
        d = a[17] - d;
        a[17] = d;
        d = a[8] - d;
        a[8] = d;
        d = a[9] - d;
        a[9] = d;
        d = a[24] - d;
        a[24] = d;
        d = a[25] - d;
        a[25] = d;
        d = a[4] - d;
        a[4] = d;
        d = a[5] - d;
        a[5] = d;
        d = a[20] - d;
        a[20] = d;
        d = a[21] - d;
        a[21] = d;
        d = a[12] - d;
        a[12] = d;
        d = a[13] - d;
        a[13] = d;
        d = a[28] - d;
        a[28] = d;
        d = a[29] - d;
        a[29] = d;
        d = a[0];
        a[0] += a[31];
        a[31] -= d;
        d = a[1];
        a[1] += a[30];
        a[30] -= d;
        d = a[16];
        a[16] += a[15];
        a[15] -= d;
        d = a[17];
        a[17] += a[14];
        a[14] -= d;
        d = a[8];
        a[8] += a[23];
        a[23] -= d;
        d = a[9];
        a[9] += a[22];
        a[22] -= d;
        d = a[24];
        a[24] += a[7];
        a[7] -= d;
        d = a[25];
        a[25] += a[6];
        a[6] -= d;
        d = a[4];
        a[4] += a[27];
        a[27] -= d;
        d = a[5];
        a[5] += a[26];
        a[26] -= d;
        d = a[20];
        a[20] += a[11];
        a[11] -= d;
        d = a[21];
        a[21] += a[10];
        a[10] -= d;
        d = a[12];
        a[12] += a[19];
        a[19] -= d;
        d = a[13];
        a[13] += a[18];
        a[18] -= d;
        d = a[28];
        a[28] += a[3];
        a[3] -= d;
        d = a[29];
        a[29] += a[2];
        a[2] -= d;
      }
      var k = [
        -0.1482523854003001,
        32.308141959636465,
        296.40344946382766,
        883.1344870032432,
        11113.947376231741,
        1057.2713659324597,
        305.7402417275812,
        30.825928907280012,
        3.8533188138216365,
        59.42900443849514,
        709.5899960123345,
        5281.91112291017,
        -5829.66483675846,
        -817.6293103748613,
        -76.91656988279972,
        -4.594269939176596,
        0.9063471690191471,
        0.1960342806591213,
        -0.15466694054279598,
        34.324387823855965,
        301.8067566458425,
        817.599602898885,
        11573.795901679885,
        1181.2520595540152,
        321.59731579894424,
        31.232021761053772,
        3.7107095756221318,
        53.650946155329365,
        684.167428119626,
        5224.56624370173,
        -6366.391851890084,
        -908.9766368219582,
        -89.83068876699639,
        -5.411397422890401,
        0.8206787908286602,
        0.3901806440322567,
        -0.16070888947830023,
        36.147034243915876,
        304.11815768187864,
        732.7429163887613,
        11989.60988270091,
        1300.012278487897,
        335.28490093152146,
        31.48816102859945,
        3.373875931311736,
        47.232241542899175,
        652.7371796173471,
        5132.414255594984,
        -6909.087078780055,
        -1001.9990371107289,
        -103.62185754286375,
        -6.104916304710272,
        0.7416505462720353,
        0.5805693545089249,
        -0.16636367662261495,
        37.751650073343995,
        303.01103387567713,
        627.9747488785183,
        12358.763425278165,
        1412.2779918482834,
        346.7496836825721,
        31.598286663170416,
        3.1598635433980946,
        40.57878626349686,
        616.1671130880391,
        5007.833007176154,
        -7454.040671756168,
        -1095.7960341867115,
        -118.24411666465777,
        -6.818469345853504,
        0.6681786379192989,
        0.7653668647301797,
        -0.1716176790982088,
        39.11551877123304,
        298.3413246578966,
        503.5259106886539,
        12679.589408408976,
        1516.5821921214542,
        355.9850766329023,
        31.395241710249053,
        2.9164211881972335,
        33.79716964664243,
        574.8943997801362,
        4853.234992253242,
        -7997.57021486075,
        -1189.7624067269965,
        -133.6444792601766,
        -7.7202770609839915,
        0.5993769336819237,
        0.9427934736519954,
        -0.17645823955292173,
        40.21879108166477,
        289.9982036694474,
        359.3226160751053,
        12950.259102786438,
        1612.1013903507662,
        362.85067106591504,
        31.045922092242872,
        2.822222032597987,
        26.988862316190684,
        529.8996541764288,
        4671.371946949588,
        -8535.899136645805,
        -1282.5898586244496,
        -149.58553632943463,
        -8.643494270763135,
        0.5345111359507916,
        1.111140466039205,
        -0.36174739330527045,
        41.04429910497807,
        277.5463268268618,
        195.6386023135583,
        13169.43812144731,
        1697.6433561479398,
        367.40983966190305,
        30.557037410382826,
        2.531473372857427,
        20.070154905927314,
        481.50208566532336,
        4464.970341588308,
        -9065.36882077239,
        -1373.62841526722,
        -166.1660487028118,
        -9.58289321133207,
        0.4729647758913199,
        1.268786568327291,
        -0.36970682634889585,
        41.393213350082036,
        261.2935935556502,
        12.935476055240873,
        13336.131683328815,
        1772.508612059496,
        369.76534388639965,
        29.751323653701338,
        2.4023193045459172,
        13.304795348228817,
        430.5615775526625,
        4237.0568611071185,
        -9581.931701634761,
        -1461.6913552409758,
        -183.12733958476446,
        -10.718010163869403,
        0.41421356237309503,
        1.414213562373095,
        -0.37677560326535325,
        41.619486213528496,
        241.05423794991074,
        -187.94665032361226,
        13450.063605744153,
        1836.153896465782,
        369.4908799925761,
        29.001847876923147,
        2.0714759319987186,
        6.779591200894186,
        377.7767837205709,
        3990.386575512536,
        -10081.709459700915,
        -1545.947424837898,
        -200.3762958015653,
        -11.864482073055006,
        0.3578057213145241,
        1.546020906725474,
        -0.3829366947518991,
        41.1516456456653,
        216.47684307105183,
        -406.1569483347166,
        13511.136535077321,
        1887.8076599260432,
        367.3025214564151,
        28.136213436723654,
        1.913880671464418,
        0.3829366947518991,
        323.85365704338597,
        3728.1472257487526,
        -10561.233882199509,
        -1625.2025997821418,
        -217.62525175416,
        -13.015432208941645,
        0.3033466836073424,
        1.66293922460509,
        -0.5822628872992417,
        40.35639251440489,
        188.20071124269245,
        -640.2706748618148,
        13519.21490106562,
        1927.6022433578062,
        362.8197642637487,
        26.968821921868447,
        1.7463817695935329,
        -5.62650678237171,
        269.3016715297017,
        3453.386536448852,
        -11016.145278780888,
        -1698.6569643425091,
        -234.7658734267683,
        -14.16351421663124,
        0.2504869601913055,
        1.76384252869671,
        -0.5887180101749253,
        39.23429103868072,
        155.76096234403798,
        -889.2492977967378,
        13475.470561874661,
        1955.0535223723712,
        356.4450994756727,
        25.894952980042156,
        1.5695032905781554,
        -11.181939564328772,
        214.80884394039484,
        3169.1640829158237,
        -11443.321309975563,
        -1765.1588461316153,
        -251.68908574481912,
        -15.49755935939164,
        0.198912367379658,
        1.847759065022573,
        -0.7912582233652842,
        37.39369355329111,
        119.699486012458,
        -1151.0956593239027,
        13380.446257078214,
        1970.3952110853447,
        348.01959814116185,
        24.731487364283044,
        1.3850130831637748,
        -16.421408865300393,
        161.05030052864092,
        2878.3322807850063,
        -11838.991423510031,
        -1823.985884688674,
        -268.2854986386903,
        -16.81724543849939,
        0.1483359875383474,
        1.913880671464418,
        -0.7960642926861912,
        35.2322109610459,
        80.01928065061526,
        -1424.0212633405113,
        13235.794061869668,
        1973.804052543835,
        337.9908651258184,
        23.289159354463873,
        1.3934255946442087,
        -21.099669467133474,
        108.48348407242611,
        2583.700758091299,
        -12199.726194855148,
        -1874.2780658979746,
        -284.2467154529415,
        -18.11369784385905,
        0.09849140335716425,
        1.961570560806461,
        -0.998795456205172,
        32.56307803611191,
        36.958364584370486,
        -1706.075448829146,
        13043.287458812016,
        1965.3831106103316,
        326.43182772364605,
        22.175018750622293,
        1.198638339011324,
        -25.371248002043963,
        57.53505923036915,
        2288.41886619975,
        -12522.674544337233,
        -1914.8400385312243,
        -299.26241273417224,
        -19.37805630698734,
        0.04912684976946725,
        1.990369453344394,
        0.0178904535 * aa.SQRT2 / 2384e-9,
        8938074e-9 * aa.SQRT2 / 2384e-9,
        0.0015673635 * aa.SQRT2 / 2384e-9,
        1228571e-9 * aa.SQRT2 / 2384e-9,
        4856585e-10 * aa.SQRT2 / 2384e-9,
        109434e-9 * aa.SQRT2 / 2384e-9,
        50783e-9 * aa.SQRT2 / 2384e-9,
        6914e-9 * aa.SQRT2 / 2384e-9,
        12804.797818791945,
        1945.5515939597317,
        313.4244966442953,
        20.801593959731544,
        1995.1556208053692,
        9.000838926174497,
        -29.20218120805369
      ], n = [[
        2382191739347913e-28,
        6423305872147834e-28,
        9400849094049688e-28,
        1122435026096556e-27,
        1183840321267481e-27,
        1122435026096556e-27,
        940084909404969e-27,
        6423305872147839e-28,
        2382191739347918e-28,
        5456116108943412e-27,
        4878985199565852e-27,
        4240448995017367e-27,
        3559909094758252e-27,
        2858043359288075e-27,
        2156177623817898e-27,
        1475637723558783e-27,
        8371015190102974e-28,
        2599706096327376e-28,
        -5456116108943412e-27,
        -4878985199565852e-27,
        -4240448995017367e-27,
        -3559909094758252e-27,
        -2858043359288076e-27,
        -2156177623817898e-27,
        -1475637723558783e-27,
        -8371015190102975e-28,
        -2599706096327376e-28,
        -2382191739347923e-28,
        -6423305872147843e-28,
        -9400849094049696e-28,
        -1122435026096556e-27,
        -1183840321267481e-27,
        -1122435026096556e-27,
        -9400849094049694e-28,
        -642330587214784e-27,
        -2382191739347918e-28
      ], [
        2382191739347913e-28,
        6423305872147834e-28,
        9400849094049688e-28,
        1122435026096556e-27,
        1183840321267481e-27,
        1122435026096556e-27,
        9400849094049688e-28,
        6423305872147841e-28,
        2382191739347918e-28,
        5456116108943413e-27,
        4878985199565852e-27,
        4240448995017367e-27,
        3559909094758253e-27,
        2858043359288075e-27,
        2156177623817898e-27,
        1475637723558782e-27,
        8371015190102975e-28,
        2599706096327376e-28,
        -5461314069809755e-27,
        -4921085770524055e-27,
        -4343405037091838e-27,
        -3732668368707687e-27,
        -3093523840190885e-27,
        -2430835727329465e-27,
        -1734679010007751e-27,
        -974825365660928e-27,
        -2797435120168326e-28,
        0,
        0,
        0,
        0,
        0,
        0,
        -2283748241799531e-28,
        -4037858874020686e-28,
        -2146547464825323e-28
      ], [
        0.1316524975873958,
        0.414213562373095,
        0.7673269879789602,
        1.091308501069271,
        1.303225372841206,
        1.56968557711749,
        1.920982126971166,
        2.414213562373094,
        3.171594802363212,
        4.510708503662055,
        7.595754112725146,
        22.90376554843115,
        0.984807753012208,
        0.6427876096865394,
        0.3420201433256688,
        0.9396926207859084,
        -0.1736481776669303,
        -0.7660444431189779,
        0.8660254037844387,
        0.5,
        -0.5144957554275265,
        -0.4717319685649723,
        -0.3133774542039019,
        -0.1819131996109812,
        -0.09457419252642064,
        -0.04096558288530405,
        -0.01419856857247115,
        -0.003699974673760037,
        0.8574929257125442,
        0.8817419973177052,
        0.9496286491027329,
        0.9833145924917901,
        0.9955178160675857,
        0.9991605581781475,
        0.999899195244447,
        0.9999931550702802
      ], [
        0,
        0,
        0,
        0,
        0,
        0,
        2283748241799531e-28,
        4037858874020686e-28,
        2146547464825323e-28,
        5461314069809755e-27,
        4921085770524055e-27,
        4343405037091838e-27,
        3732668368707687e-27,
        3093523840190885e-27,
        2430835727329466e-27,
        1734679010007751e-27,
        974825365660928e-27,
        2797435120168326e-28,
        -5456116108943413e-27,
        -4878985199565852e-27,
        -4240448995017367e-27,
        -3559909094758253e-27,
        -2858043359288075e-27,
        -2156177623817898e-27,
        -1475637723558782e-27,
        -8371015190102975e-28,
        -2599706096327376e-28,
        -2382191739347913e-28,
        -6423305872147834e-28,
        -9400849094049688e-28,
        -1122435026096556e-27,
        -1183840321267481e-27,
        -1122435026096556e-27,
        -9400849094049688e-28,
        -6423305872147841e-28,
        -2382191739347918e-28
      ]], w2 = n[c.SHORT_TYPE], E = n[c.SHORT_TYPE], B = n[c.SHORT_TYPE], G2 = n[c.SHORT_TYPE], f = [0, 1, 16, 17, 8, 9, 24, 25, 4, 5, 20, 21, 12, 13, 28, 29, 2, 3, 18, 19, 10, 11, 26, 27, 6, 7, 22, 23, 14, 15, 30, 31];
      this.mdct_sub48 = function(b, k2, a) {
        for (var m = 286, v = 0; v < b.channels_out; v++) {
          for (var e = 0; e < b.mode_gr; e++) {
            for (var l, d = b.l3_side.tt[e][v], g = d.xr, q = 0, D = b.sb_sample[v][1 - e], p = 0, r = 0; 9 > r; r++) for (u(k2, m, D[p]), u(
              k2,
              m + 32,
              D[p + 1]
            ), p += 2, m += 64, l = 1; 32 > l; l += 2) D[p - 1][l] *= -1;
            for (l = 0; 32 > l; l++, q += 18) {
              D = d.block_type;
              p = b.sb_sample[v][e];
              var t = b.sb_sample[v][1 - e];
              0 != d.mixed_block_flag && 2 > l && (D = 0);
              if (1e-12 > b.amp_filter[l]) na.fill(g, q + 0, q + 18, 0);
              else {
                if (1 > b.amp_filter[l]) for (r = 0; 18 > r; r++) t[r][f[l]] *= b.amp_filter[l];
                if (D == c.SHORT_TYPE) {
                  for (r = -3; 0 > r; r++) {
                    var J = n[c.SHORT_TYPE][r + 3];
                    g[q + 3 * r + 9] = p[9 + r][f[l]] * J - p[8 - r][f[l]];
                    g[q + 3 * r + 18] = p[14 - r][f[l]] * J + p[15 + r][f[l]];
                    g[q + 3 * r + 10] = p[15 + r][f[l]] * J - p[14 - r][f[l]];
                    g[q + 3 * r + 19] = t[2 - r][f[l]] * J + t[3 + r][f[l]];
                    g[q + 3 * r + 11] = t[3 + r][f[l]] * J - t[2 - r][f[l]];
                    g[q + 3 * r + 20] = t[8 - r][f[l]] * J + t[9 + r][f[l]];
                  }
                  r = g;
                  p = q;
                  for (J = 0; 3 > J; J++) {
                    var h = r[p + 6] * n[c.SHORT_TYPE][0] - r[p + 15];
                    t = r[p + 0] * n[c.SHORT_TYPE][2] - r[p + 9];
                    var x = h + t;
                    var y = h - t;
                    h = r[p + 15] * n[c.SHORT_TYPE][0] + r[p + 6];
                    t = r[p + 9] * n[c.SHORT_TYPE][2] + r[p + 0];
                    var A = h + t;
                    var N = -h + t;
                    t = 2069978111953089e-26 * (r[p + 3] * n[c.SHORT_TYPE][1] - r[p + 12]);
                    h = 2069978111953089e-26 * (r[p + 12] * n[c.SHORT_TYPE][1] + r[p + 3]);
                    r[p + 0] = 190752519173728e-25 * x + t;
                    r[p + 15] = 190752519173728e-25 * -A + h;
                    y *= 16519652744032674e-27;
                    A = 9537625958686404e-27 * A + h;
                    r[p + 3] = y - A;
                    r[p + 6] = y + A;
                    x = 9537625958686404e-27 * x - t;
                    N *= 16519652744032674e-27;
                    r[p + 9] = x + N;
                    r[p + 12] = x - N;
                    p++;
                  }
                } else {
                  J = K(18);
                  for (r = -9; 0 > r; r++) x = n[D][r + 27] * t[r + 9][f[l]] + n[D][r + 36] * t[8 - r][f[l]], y = n[D][r + 9] * p[r + 9][f[l]] - n[D][r + 18] * p[8 - r][f[l]], J[r + 9] = x - y * w2[3 + r + 9], J[r + 18] = x * w2[3 + r + 9] + y;
                  r = g;
                  p = q;
                  x = J;
                  var H = x[17] - x[9];
                  var O = x[15] - x[11];
                  var F = x[14] - x[12];
                  N = x[0] + x[8];
                  A = x[1] + x[7];
                  h = x[2] + x[6];
                  y = x[3] + x[5];
                  r[p + 17] = N + h - y - (A - x[4]);
                  J = (N + h - y) * E[19] + (A - x[4]);
                  t = (H - O - F) * E[18];
                  r[p + 5] = t + J;
                  r[p + 6] = t - J;
                  var C = (x[16] - x[10]) * E[18];
                  A = A * E[19] + x[4];
                  t = H * E[12] + C + O * E[13] + F * E[14];
                  J = -N * E[16] + A - h * E[17] + y * E[15];
                  r[p + 1] = t + J;
                  r[p + 2] = t - J;
                  t = H * E[13] - C - O * E[14] + F * E[12];
                  J = -N * E[17] + A - h * E[15] + y * E[16];
                  r[p + 9] = t + J;
                  r[p + 10] = t - J;
                  t = H * E[14] - C + O * E[12] - F * E[13];
                  J = N * E[15] - A + h * E[16] - y * E[17];
                  r[p + 13] = t + J;
                  r[p + 14] = t - J;
                  H = x[8] - x[0];
                  O = x[6] - x[2];
                  F = x[5] - x[3];
                  N = x[17] + x[9];
                  A = x[16] + x[10];
                  h = x[15] + x[11];
                  y = x[14] + x[12];
                  r[p + 0] = N + h + y + (A + x[13]);
                  t = (N + h + y) * E[19] - (A + x[13]);
                  J = (H - O + F) * E[18];
                  r[p + 11] = t + J;
                  r[p + 12] = t - J;
                  C = (x[7] - x[1]) * E[18];
                  A = x[13] - A * E[19];
                  t = N * E[15] - A + h * E[16] + y * E[17];
                  J = H * E[14] + C + O * E[12] + F * E[13];
                  r[p + 3] = t + J;
                  r[p + 4] = t - J;
                  t = -N * E[17] + A - h * E[15] - y * E[16];
                  J = H * E[13] + C - O * E[14] - F * E[12];
                  r[p + 7] = t + J;
                  r[p + 8] = t - J;
                  t = -N * E[16] + A - h * E[17] - y * E[15];
                  J = H * E[12] - C + O * E[13] - F * E[14];
                  r[p + 15] = t + J;
                  r[p + 16] = t - J;
                }
              }
              if (D != c.SHORT_TYPE && 0 != l) for (r = 7; 0 <= r; --r) D = g[q + r] * B[20 + r] + g[q + -1 - r] * G2[28 + r], p = g[q + r] * G2[28 + r] - g[q + -1 - r] * B[20 + r], g[q + -1 - r] = D, g[q + r] = p;
            }
          }
          k2 = a;
          m = 286;
          if (1 == b.mode_gr) for (e = 0; 18 > e; e++) T.arraycopy(b.sb_sample[v][1][e], 0, b.sb_sample[v][0][e], 0, 32);
        }
      };
    }
    function Xa() {
      this.thm = new Xb();
      this.en = new Xb();
    }
    function c() {
      var u = c.FFTOFFSET, k = c.MPG_MD_MS_LR, n = null, w2 = this.psy = null, E = null, B = null;
      this.setModules = function(c2, b, k2, a) {
        n = c2;
        w2 = this.psy = b;
        E = a;
        B = k2;
      };
      var ha = new Fc();
      this.lame_encode_mp3_frame = function(f, b, v, a, m, z) {
        var e = Ob([2, 2]);
        e[0][0] = new Xa();
        e[0][1] = new Xa();
        e[1][0] = new Xa();
        e[1][1] = new Xa();
        var l = Ob([2, 2]);
        l[0][0] = new Xa();
        l[0][1] = new Xa();
        l[1][0] = new Xa();
        l[1][1] = new Xa();
        var d = [null, null], g = f.internal_flags, q = ca([2, 4]), D = [0.5, 0.5], p = [[0, 0], [0, 0]], r = [[0, 0], [0, 0]];
        d[0] = b;
        d[1] = v;
        if (0 == g.lame_encode_frame_init) {
          b = f.internal_flags;
          var t, J;
          if (0 == b.lame_encode_frame_init) {
            v = K(2014);
            var h = K(2014);
            b.lame_encode_frame_init = 1;
            for (J = t = 0; t < 286 + 576 * (1 + b.mode_gr); ++t) t < 576 * b.mode_gr ? (v[t] = 0, 2 == b.channels_out && (h[t] = 0)) : (v[t] = d[0][J], 2 == b.channels_out && (h[t] = d[1][J]), ++J);
            for (J = 0; J < b.mode_gr; J++) for (t = 0; t < b.channels_out; t++) b.l3_side.tt[J][t].block_type = c.SHORT_TYPE;
            ha.mdct_sub48(b, v, h);
          }
        }
        g.padding = 0;
        0 > (g.slot_lag -= g.frac_SpF) && (g.slot_lag += f.out_samplerate, g.padding = 1);
        if (0 != g.psymodel) for (h = [null, null], t = 0, J = X(2), v = 0; v < g.mode_gr; v++) {
          for (b = 0; b < g.channels_out; b++) h[b] = d[b], t = 576 + 576 * v - c.FFTOFFSET;
          b = f.VBR == G.vbr_mtrh || f.VBR == G.vbr_mt ? w2.L3psycho_anal_vbr(f, h, t, v, e, l, p[v], r[v], q[v], J) : w2.L3psycho_anal_ns(f, h, t, v, e, l, p[v], r[v], q[v], J);
          if (0 != b) return -4;
          f.mode == la.JOINT_STEREO && (D[v] = q[v][2] + q[v][3], 0 < D[v] && (D[v] = q[v][3] / D[v]));
          for (b = 0; b < g.channels_out; b++) {
            var x = g.l3_side.tt[v][b];
            x.block_type = J[b];
            x.mixed_block_flag = 0;
          }
        }
        else for (v = 0; v < g.mode_gr; v++) for (b = 0; b < g.channels_out; b++) g.l3_side.tt[v][b].block_type = c.NORM_TYPE, g.l3_side.tt[v][b].mixed_block_flag = 0, r[v][b] = p[v][b] = 700;
        0 == g.ATH.useAdjust ? g.ATH.adjust = 1 : (b = g.loudness_sq[0][0], q = g.loudness_sq[1][0], 2 == g.channels_out ? (b += g.loudness_sq[0][1], q += g.loudness_sq[1][1]) : (b += b, q += q), 2 == g.mode_gr && (b = Math.max(b, q)), b = 0.5 * b * g.ATH.aaSensitivityP, 0.03125 < b ? (1 <= g.ATH.adjust ? g.ATH.adjust = 1 : g.ATH.adjust < g.ATH.adjustLimit && (g.ATH.adjust = g.ATH.adjustLimit), g.ATH.adjustLimit = 1) : (q = 31.98 * b + 625e-6, g.ATH.adjust >= q ? (g.ATH.adjust *= 0.075 * q + 0.925, g.ATH.adjust < q && (g.ATH.adjust = q)) : g.ATH.adjustLimit >= q ? g.ATH.adjust = q : g.ATH.adjust < g.ATH.adjustLimit && (g.ATH.adjust = g.ATH.adjustLimit), g.ATH.adjustLimit = q));
        ha.mdct_sub48(g, d[0], d[1]);
        g.mode_ext = c.MPG_MD_LR_LR;
        if (f.force_ms) g.mode_ext = c.MPG_MD_MS_LR;
        else if (f.mode == la.JOINT_STEREO) {
          for (v = h = q = 0; v < g.mode_gr; v++) for (b = 0; b < g.channels_out; b++) q += r[v][b], h += p[v][b];
          q <= 1 * h && (q = g.l3_side.tt[0], b = g.l3_side.tt[g.mode_gr - 1], q[0].block_type == q[1].block_type && b[0].block_type == b[1].block_type && (g.mode_ext = c.MPG_MD_MS_LR));
        }
        g.mode_ext == k && (e = l, p = r);
        if (f.analysis && null != g.pinfo) for (v = 0; v < g.mode_gr; v++) for (b = 0; b < g.channels_out; b++) g.pinfo.ms_ratio[v] = g.ms_ratio[v], g.pinfo.ms_ener_ratio[v] = D[v], g.pinfo.blocktype[v][b] = g.l3_side.tt[v][b].block_type, g.pinfo.pe[v][b] = p[v][b], T.arraycopy(g.l3_side.tt[v][b].xr, 0, g.pinfo.xr[v][b], 0, 576), g.mode_ext == k && (g.pinfo.ers[v][b] = g.pinfo.ers[v][b + 2], T.arraycopy(g.pinfo.energy[v][b + 2], 0, g.pinfo.energy[v][b], 0, g.pinfo.energy[v][b].length));
        if (f.VBR == G.vbr_off || f.VBR == G.vbr_abr) {
          for (l = 0; 18 > l; l++) g.nsPsy.pefirbuf[l] = g.nsPsy.pefirbuf[l + 1];
          for (v = r = 0; v < g.mode_gr; v++) for (b = 0; b < g.channels_out; b++) r += p[v][b];
          g.nsPsy.pefirbuf[18] = r;
          r = g.nsPsy.pefirbuf[9];
          for (l = 0; 9 > l; l++) r += (g.nsPsy.pefirbuf[l] + g.nsPsy.pefirbuf[18 - l]) * c.fircoef[l];
          r = 3350 * g.mode_gr * g.channels_out / r;
          for (v = 0; v < g.mode_gr; v++) for (b = 0; b < g.channels_out; b++) p[v][b] *= r;
        }
        g.iteration_loop.iteration_loop(f, p, D, e);
        n.format_bitstream(f);
        a = n.copy_buffer(g, a, m, z, 1);
        f.bWriteVbrTag && E.addVbrFrame(f);
        if (f.analysis && null != g.pinfo) {
          for (b = 0; b < g.channels_out; b++) {
            for (m = 0; m < u; m++) g.pinfo.pcmdata[b][m] = g.pinfo.pcmdata[b][m + f.framesize];
            for (m = u; 1600 > m; m++) g.pinfo.pcmdata[b][m] = d[b][m - u];
          }
          B.set_frame_pinfo(f, e);
        }
        g.bitrate_stereoMode_Hist[g.bitrate_index][4]++;
        g.bitrate_stereoMode_Hist[15][4]++;
        2 == g.channels_out && (g.bitrate_stereoMode_Hist[g.bitrate_index][g.mode_ext]++, g.bitrate_stereoMode_Hist[15][g.mode_ext]++);
        for (f = 0; f < g.mode_gr; ++f) for (d = 0; d < g.channels_out; ++d) m = g.l3_side.tt[f][d].block_type | 0, 0 != g.l3_side.tt[f][d].mixed_block_flag && (m = 4), g.bitrate_blockType_Hist[g.bitrate_index][m]++, g.bitrate_blockType_Hist[g.bitrate_index][5]++, g.bitrate_blockType_Hist[15][m]++, g.bitrate_blockType_Hist[15][5]++;
        return a;
      };
    }
    function Gc() {
      this.size = this.pos = this.want = this.seen = this.sum = 0;
      this.bag = null;
      this.TotalFrameSize = this.nBytesWritten = this.nVbrNumFrames = 0;
    }
    function Hc() {
      this.tt = [[null, null], [null, null]];
      this.resvDrain_post = this.resvDrain_pre = this.private_bits = this.main_data_begin = 0;
      this.scfsi = [X(4), X(4)];
      for (var c2 = 0; 2 > c2; c2++) for (var k = 0; 2 > k; k++) this.tt[c2][k] = new rb();
    }
    function Ic() {
      this.last_en_subshort = ca([4, 9]);
      this.lastAttacks = X(4);
      this.pefirbuf = K(19);
      this.longfact = K(c.SBMAX_l);
      this.shortfact = K(c.SBMAX_s);
      this.attackthre_s = this.attackthre = 0;
    }
    function Xb() {
      this.l = K(c.SBMAX_l);
      this.s = ca([c.SBMAX_s, 3]);
      var u = this;
      this.assign = function(k) {
        T.arraycopy(k.l, 0, u.l, 0, c.SBMAX_l);
        for (var n = 0; n < c.SBMAX_s; n++) for (var w2 = 0; 3 > w2; w2++) u.s[n][w2] = k.s[n][w2];
      };
    }
    function da() {
      function u() {
        this.ptr = this.write_timing = 0;
        this.buf = new Int8Array(40);
      }
      this.fill_buffer_resample_init = this.iteration_init_init = this.lame_encode_frame_init = this.Class_ID = 0;
      this.mfbuf = ca([2, da.MFSIZE]);
      this.full_outer_loop = this.use_best_huffman = this.subblock_gain = this.noise_shaping_stop = this.psymodel = this.substep_shaping = this.noise_shaping_amp = this.noise_shaping = this.highpass2 = this.highpass1 = this.lowpass2 = this.lowpass1 = this.mode_ext = this.samplerate_index = this.bitrate_index = this.VBR_max_bitrate = this.VBR_min_bitrate = this.mf_size = this.mf_samples_to_encode = this.resample_ratio = this.channels_out = this.channels_in = this.mode_gr = 0;
      this.l3_side = new Hc();
      this.ms_ratio = K(2);
      this.slot_lag = this.frac_SpF = this.padding = 0;
      this.tag_spec = null;
      this.nMusicCRC = 0;
      this.OldValue = X(2);
      this.CurrentStep = X(2);
      this.masking_lower = 0;
      this.bv_scf = X(576);
      this.pseudohalf = X(sa.SFBMAX);
      this.sfb21_extra = false;
      this.inbuf_old = Array(2);
      this.blackfilt = Array(2 * da.BPC + 1);
      this.itime = new Float64Array(2);
      this.sideinfo_len = 0;
      this.sb_sample = ca([2, 2, 18, c.SBLIMIT]);
      this.amp_filter = K(32);
      this.header = Array(da.MAX_HEADER_BUF);
      this.ResvMax = this.ResvSize = this.ancillary_flag = this.w_ptr = this.h_ptr = 0;
      this.scalefac_band = new za();
      this.minval_l = K(c.CBANDS);
      this.minval_s = K(c.CBANDS);
      this.nb_1 = ca([4, c.CBANDS]);
      this.nb_2 = ca([4, c.CBANDS]);
      this.nb_s1 = ca([4, c.CBANDS]);
      this.nb_s2 = ca([4, c.CBANDS]);
      this.s3_ll = this.s3_ss = null;
      this.decay = 0;
      this.thm = Array(4);
      this.en = Array(4);
      this.tot_ener = K(4);
      this.loudness_sq = ca([2, 2]);
      this.loudness_sq_save = K(2);
      this.mld_l = K(c.SBMAX_l);
      this.mld_s = K(c.SBMAX_s);
      this.bm_l = X(c.SBMAX_l);
      this.bo_l = X(c.SBMAX_l);
      this.bm_s = X(c.SBMAX_s);
      this.bo_s = X(c.SBMAX_s);
      this.npart_s = this.npart_l = 0;
      this.s3ind = Ia([c.CBANDS, 2]);
      this.s3ind_s = Ia([c.CBANDS, 2]);
      this.numlines_s = X(c.CBANDS);
      this.numlines_l = X(c.CBANDS);
      this.rnumlines_l = K(c.CBANDS);
      this.mld_cb_l = K(c.CBANDS);
      this.mld_cb_s = K(c.CBANDS);
      this.numlines_l_num1 = this.numlines_s_num1 = 0;
      this.pe = K(4);
      this.ms_ener_ratio_old = this.ms_ratio_l_old = this.ms_ratio_s_old = 0;
      this.blocktype_old = X(2);
      this.nsPsy = new Ic();
      this.VBR_seek_table = new Gc();
      this.PSY = this.ATH = null;
      this.nogap_current = this.nogap_total = 0;
      this.findPeakSample = this.findReplayGain = this.decode_on_the_fly = true;
      this.AudiophileGain = this.RadioGain = this.PeakSample = 0;
      this.rgdata = null;
      this.noclipScale = this.noclipGainChange = 0;
      this.bitrate_stereoMode_Hist = Ia([16, 5]);
      this.bitrate_blockType_Hist = Ia([16, 6]);
      this.hip = this.pinfo = null;
      this.in_buffer_nsamples = 0;
      this.iteration_loop = this.in_buffer_1 = this.in_buffer_0 = null;
      for (var k = 0; k < this.en.length; k++) this.en[k] = new Xb();
      for (k = 0; k < this.thm.length; k++) this.thm[k] = new Xb();
      for (k = 0; k < this.header.length; k++) this.header[k] = new u();
    }
    function Jc() {
      function u(c2, k2, f) {
        var b = 0;
        f <<= 1;
        var n2 = k2 + f;
        var a = 4;
        do {
          var m;
          var u2 = a >> 1;
          var e = a;
          var l = a << 1;
          var d = l + e;
          a = l << 1;
          var g = k2;
          var q = g + u2;
          do {
            var B = c2[g + 0] - c2[g + e];
            var p = c2[g + 0] + c2[g + e];
            var r = c2[g + l] - c2[g + d];
            var t = c2[g + l] + c2[g + d];
            c2[g + l] = p - t;
            c2[g + 0] = p + t;
            c2[g + d] = B - r;
            c2[g + e] = B + r;
            B = c2[q + 0] - c2[q + e];
            p = c2[q + 0] + c2[q + e];
            r = aa.SQRT2 * c2[q + d];
            t = aa.SQRT2 * c2[q + l];
            c2[q + l] = p - t;
            c2[q + 0] = p + t;
            c2[q + d] = B - r;
            c2[q + e] = B + r;
            q += a;
            g += a;
          } while (g < n2);
          var E2 = w2[b + 0];
          var h = w2[b + 1];
          for (m = 1; m < u2; m++) {
            var x = 1 - 2 * h * h;
            var y = 2 * h * E2;
            g = k2 + m;
            q = k2 + e - m;
            do {
              var A = y * c2[g + e] - x * c2[q + e];
              t = x * c2[g + e] + y * c2[q + e];
              B = c2[g + 0] - t;
              p = c2[g + 0] + t;
              var K2 = c2[q + 0] - A;
              var H = c2[q + 0] + A;
              A = y * c2[g + d] - x * c2[q + d];
              t = x * c2[g + d] + y * c2[q + d];
              r = c2[g + l] - t;
              t = c2[g + l] + t;
              var O = c2[q + l] - A;
              var F = c2[q + l] + A;
              A = h * t - E2 * O;
              t = E2 * t + h * O;
              c2[g + l] = p - t;
              c2[g + 0] = p + t;
              c2[q + d] = K2 - A;
              c2[q + e] = K2 + A;
              A = E2 * F - h * r;
              t = h * F + E2 * r;
              c2[q + l] = H - t;
              c2[q + 0] = H + t;
              c2[g + d] = B - A;
              c2[g + e] = B + A;
              q += a;
              g += a;
            } while (g < n2);
            x = E2;
            E2 = x * w2[b + 0] - h * w2[b + 1];
            h = x * w2[b + 1] + h * w2[b + 0];
          }
          b += 2;
        } while (a < f);
      }
      var k = K(c.BLKSIZE), n = K(c.BLKSIZE_s / 2), w2 = [0.9238795325112867, 0.3826834323650898, 0.9951847266721969, 0.0980171403295606, 0.9996988186962042, 0.02454122852291229, 0.9999811752826011, 0.006135884649154475], E = [
        0,
        128,
        64,
        192,
        32,
        160,
        96,
        224,
        16,
        144,
        80,
        208,
        48,
        176,
        112,
        240,
        8,
        136,
        72,
        200,
        40,
        168,
        104,
        232,
        24,
        152,
        88,
        216,
        56,
        184,
        120,
        248,
        4,
        132,
        68,
        196,
        36,
        164,
        100,
        228,
        20,
        148,
        84,
        212,
        52,
        180,
        116,
        244,
        12,
        140,
        76,
        204,
        44,
        172,
        108,
        236,
        28,
        156,
        92,
        220,
        60,
        188,
        124,
        252,
        2,
        130,
        66,
        194,
        34,
        162,
        98,
        226,
        18,
        146,
        82,
        210,
        50,
        178,
        114,
        242,
        10,
        138,
        74,
        202,
        42,
        170,
        106,
        234,
        26,
        154,
        90,
        218,
        58,
        186,
        122,
        250,
        6,
        134,
        70,
        198,
        38,
        166,
        102,
        230,
        22,
        150,
        86,
        214,
        54,
        182,
        118,
        246,
        14,
        142,
        78,
        206,
        46,
        174,
        110,
        238,
        30,
        158,
        94,
        222,
        62,
        190,
        126,
        254
      ];
      this.fft_short = function(k2, w3, f, b, v) {
        for (k2 = 0; 3 > k2; k2++) {
          var a = c.BLKSIZE_s / 2, m = 65535 & 192 * (k2 + 1), B = c.BLKSIZE_s / 8 - 1;
          do {
            var e = E[B << 2] & 255;
            var l = n[e] * b[f][v + e + m];
            var d = n[127 - e] * b[f][v + e + m + 128];
            var g = l - d;
            l += d;
            var q = n[e + 64] * b[f][v + e + m + 64];
            d = n[63 - e] * b[f][v + e + m + 192];
            var D = q - d;
            q += d;
            a -= 4;
            w3[k2][a + 0] = l + q;
            w3[k2][a + 2] = l - q;
            w3[k2][a + 1] = g + D;
            w3[k2][a + 3] = g - D;
            l = n[e + 1] * b[f][v + e + m + 1];
            d = n[126 - e] * b[f][v + e + m + 129];
            g = l - d;
            l += d;
            q = n[e + 65] * b[f][v + e + m + 65];
            d = n[62 - e] * b[f][v + e + m + 193];
            D = q - d;
            q += d;
            w3[k2][a + c.BLKSIZE_s / 2 + 0] = l + q;
            w3[k2][a + c.BLKSIZE_s / 2 + 2] = l - q;
            w3[k2][a + c.BLKSIZE_s / 2 + 1] = g + D;
            w3[k2][a + c.BLKSIZE_s / 2 + 3] = g - D;
          } while (0 <= --B);
          u(w3[k2], a, c.BLKSIZE_s / 2);
        }
      };
      this.fft_long = function(n2, w3, f, b, v) {
        n2 = c.BLKSIZE / 8 - 1;
        var a = c.BLKSIZE / 2;
        do {
          var m = E[n2] & 255;
          var B = k[m] * b[f][v + m];
          var e = k[m + 512] * b[f][v + m + 512];
          var l = B - e;
          B += e;
          var d = k[m + 256] * b[f][v + m + 256];
          e = k[m + 768] * b[f][v + m + 768];
          var g = d - e;
          d += e;
          a -= 4;
          w3[a + 0] = B + d;
          w3[a + 2] = B - d;
          w3[a + 1] = l + g;
          w3[a + 3] = l - g;
          B = k[m + 1] * b[f][v + m + 1];
          e = k[m + 513] * b[f][v + m + 513];
          l = B - e;
          B += e;
          d = k[m + 257] * b[f][v + m + 257];
          e = k[m + 769] * b[f][v + m + 769];
          g = d - e;
          d += e;
          w3[a + c.BLKSIZE / 2 + 0] = B + d;
          w3[a + c.BLKSIZE / 2 + 2] = B - d;
          w3[a + c.BLKSIZE / 2 + 1] = l + g;
          w3[a + c.BLKSIZE / 2 + 3] = l - g;
        } while (0 <= --n2);
        u(
          w3,
          a,
          c.BLKSIZE / 2
        );
      };
      this.init_fft = function(u2) {
        for (u2 = 0; u2 < c.BLKSIZE; u2++) k[u2] = 0.42 - 0.5 * Math.cos(2 * Math.PI * (u2 + 0.5) / c.BLKSIZE) + 0.08 * Math.cos(4 * Math.PI * (u2 + 0.5) / c.BLKSIZE);
        for (u2 = 0; u2 < c.BLKSIZE_s / 2; u2++) n[u2] = 0.5 * (1 - Math.cos(2 * Math.PI * (u2 + 0.5) / c.BLKSIZE_s));
      };
    }
    function Pb() {
      function u(a2, d2) {
        for (var b2 = 0, h2 = 0; h2 < c.BLKSIZE / 2; ++h2) b2 += a2[h2] * d2.ATH.eql_w[h2];
        return b2 *= D;
      }
      function k(a2, c2, d2, b2, f2, e2) {
        if (c2 > a2) if (c2 < a2 * r) var g2 = c2 / a2;
        else return a2 + c2;
        else {
          if (a2 >= c2 * r) return a2 + c2;
          g2 = a2 / c2;
        }
        a2 += c2;
        if (6 >= b2 + 3) {
          if (g2 >= p) return a2;
          b2 = 0 | aa.FAST_LOG10_X(g2, 16);
          return a2 * x[b2];
        }
        b2 = 0 | aa.FAST_LOG10_X(g2, 16);
        c2 = 0 != e2 ? f2.ATH.cb_s[d2] * f2.ATH.adjust : f2.ATH.cb_l[d2] * f2.ATH.adjust;
        return a2 < t * c2 ? a2 > c2 ? (d2 = 1, 13 >= b2 && (d2 = y[b2]), c2 = aa.FAST_LOG10_X(a2 / c2, 10 / 15), a2 * ((h[b2] - d2) * c2 + d2)) : 13 < b2 ? a2 : a2 * y[b2] : a2 * h[b2];
      }
      function n(a2, c2, d2) {
        0 > a2 && (a2 = 0);
        0 > c2 && (c2 = 0);
        if (0 >= a2) return c2;
        if (0 >= c2) return a2;
        var b2 = c2 > a2 ? c2 / a2 : a2 / c2;
        if (-2 <= d2 && 2 >= d2) {
          if (b2 >= p) return a2 + c2;
          d2 = 0 | aa.FAST_LOG10_X(b2, 16);
          return (a2 + c2) * A[d2];
        }
        if (b2 < r) return a2 + c2;
        a2 < c2 && (a2 = c2);
        return a2;
      }
      function w2(a2, d2, b2, h2, f2) {
        var e2, g2, l2 = 0, k2 = 0;
        for (e2 = g2 = 0; e2 < c.SBMAX_s; ++g2, ++e2) {
          var m2 = a2.bo_s[e2], y2 = a2.npart_s;
          for (m2 = m2 < y2 ? m2 : y2; g2 < m2; ) l2 += d2[g2], k2 += b2[g2], g2++;
          a2.en[h2].s[e2][f2] = l2;
          a2.thm[h2].s[e2][f2] = k2;
          if (g2 >= y2) {
            ++e2;
            break;
          }
          k2 = a2.PSY.bo_s_weight[e2];
          y2 = 1 - k2;
          l2 = k2 * d2[g2];
          k2 *= b2[g2];
          a2.en[h2].s[e2][f2] += l2;
          a2.thm[h2].s[e2][f2] += k2;
          l2 = y2 * d2[g2];
          k2 = y2 * b2[g2];
        }
        for (; e2 < c.SBMAX_s; ++e2) a2.en[h2].s[e2][f2] = 0, a2.thm[h2].s[e2][f2] = 0;
      }
      function E(a2, d2, b2, h2) {
        var f2, e2, g2 = 0, l2 = 0;
        for (f2 = e2 = 0; f2 < c.SBMAX_l; ++e2, ++f2) {
          var k2 = a2.bo_l[f2], m2 = a2.npart_l;
          for (k2 = k2 < m2 ? k2 : m2; e2 < k2; ) g2 += d2[e2], l2 += b2[e2], e2++;
          a2.en[h2].l[f2] = g2;
          a2.thm[h2].l[f2] = l2;
          if (e2 >= m2) {
            ++f2;
            break;
          }
          l2 = a2.PSY.bo_l_weight[f2];
          m2 = 1 - l2;
          g2 = l2 * d2[e2];
          l2 *= b2[e2];
          a2.en[h2].l[f2] += g2;
          a2.thm[h2].l[f2] += l2;
          g2 = m2 * d2[e2];
          l2 = m2 * b2[e2];
        }
        for (; f2 < c.SBMAX_l; ++f2) a2.en[h2].l[f2] = 0, a2.thm[h2].l[f2] = 0;
      }
      function B(a2, c2, d2) {
        return 1 <= d2 ? a2 : 0 >= d2 ? c2 : 0 < c2 ? Math.pow(a2 / c2, d2) * c2 : 0;
      }
      function W2(a2, d2) {
        for (var b2 = 309.07, h2 = 0; h2 < c.SBMAX_s - 1; h2++) for (var f2 = 0; 3 > f2; f2++) {
          var e2 = a2.thm.s[h2][f2];
          if (0 < e2) {
            e2 *= d2;
            var g2 = a2.en.s[h2][f2];
            g2 > e2 && (b2 = g2 > 1e10 * e2 ? b2 + 23.02585092994046 * N[h2] : b2 + N[h2] * aa.FAST_LOG10(g2 / e2));
          }
        }
        return b2;
      }
      function f(a2, d2) {
        for (var b2 = 281.0575, h2 = 0; h2 < c.SBMAX_l - 1; h2++) {
          var f2 = a2.thm.l[h2];
          if (0 < f2) {
            f2 *= d2;
            var e2 = a2.en.l[h2];
            e2 > f2 && (b2 = e2 > 1e10 * f2 ? b2 + 23.02585092994046 * H[h2] : b2 + H[h2] * aa.FAST_LOG10(e2 / f2));
          }
        }
        return b2;
      }
      function b(a2, c2, b2, d2, h2) {
        var f2, e2;
        for (f2 = e2 = 0; f2 < a2.npart_l; ++f2) {
          var g2 = 0, l2 = 0, k2;
          for (k2 = 0; k2 < a2.numlines_l[f2]; ++k2, ++e2) {
            var m2 = c2[e2];
            g2 += m2;
            l2 < m2 && (l2 = m2);
          }
          b2[f2] = g2;
          d2[f2] = l2;
          h2[f2] = g2 * a2.rnumlines_l[f2];
        }
      }
      function v(a2, c2, b2, d2) {
        var h2 = J.length - 1, f2 = 0, e2 = b2[f2] + b2[f2 + 1];
        if (0 < e2) {
          var g2 = c2[f2];
          g2 < c2[f2 + 1] && (g2 = c2[f2 + 1]);
          e2 = 20 * (2 * g2 - e2) / (e2 * (a2.numlines_l[f2] + a2.numlines_l[f2 + 1] - 1));
          e2 |= 0;
          e2 > h2 && (e2 = h2);
          d2[f2] = e2;
        } else d2[f2] = 0;
        for (f2 = 1; f2 < a2.npart_l - 1; f2++) e2 = b2[f2 - 1] + b2[f2] + b2[f2 + 1], 0 < e2 ? (g2 = c2[f2 - 1], g2 < c2[f2] && (g2 = c2[f2]), g2 < c2[f2 + 1] && (g2 = c2[f2 + 1]), e2 = 20 * (3 * g2 - e2) / (e2 * (a2.numlines_l[f2 - 1] + a2.numlines_l[f2] + a2.numlines_l[f2 + 1] - 1)), e2 |= 0, e2 > h2 && (e2 = h2), d2[f2] = e2) : d2[f2] = 0;
        e2 = b2[f2 - 1] + b2[f2];
        0 < e2 ? (g2 = c2[f2 - 1], g2 < c2[f2] && (g2 = c2[f2]), e2 = 20 * (2 * g2 - e2) / (e2 * (a2.numlines_l[f2 - 1] + a2.numlines_l[f2] - 1)), e2 |= 0, e2 > h2 && (e2 = h2), d2[f2] = e2) : d2[f2] = 0;
      }
      function a(a2, c2, b2, d2, f2, h2, e2) {
        var g2 = 2 * h2;
        f2 = 0 < h2 ? Math.pow(10, f2) : 1;
        for (var l2, k2, m2 = 0; m2 < e2; ++m2) {
          var y2 = a2[2][m2], p2 = a2[3][m2], q2 = c2[0][m2], n2 = c2[1][m2], x2 = c2[2][m2], r2 = c2[3][m2];
          q2 <= 1.58 * n2 && n2 <= 1.58 * q2 ? (l2 = b2[m2] * y2, k2 = Math.max(x2, Math.min(r2, b2[m2] * p2)), l2 = Math.max(r2, Math.min(x2, l2))) : (k2 = x2, l2 = r2);
          0 < h2 && (r2 = d2[m2] * f2, q2 = Math.min(Math.max(
            q2,
            r2
          ), Math.max(n2, r2)), x2 = Math.max(k2, r2), r2 = Math.max(l2, r2), n2 = x2 + r2, 0 < n2 && q2 * g2 < n2 && (q2 = q2 * g2 / n2, x2 *= q2, r2 *= q2), k2 = Math.min(x2, k2), l2 = Math.min(r2, l2));
          k2 > y2 && (k2 = y2);
          l2 > p2 && (l2 = p2);
          c2[2][m2] = k2;
          c2[3][m2] = l2;
        }
      }
      function m(a2, c2) {
        a2 = 0 <= a2 ? 27 * -a2 : a2 * c2;
        return -72 >= a2 ? 0 : Math.exp(0.2302585093 * a2);
      }
      function z(a2) {
        0 > a2 && (a2 = 0);
        a2 *= 1e-3;
        return 13 * Math.atan(0.76 * a2) + 3.5 * Math.atan(a2 * a2 / 56.25);
      }
      function e(a2, b2, d2, f2, h2, e2, g2, l2, k2, m2, y2, p2) {
        var q2 = K(c.CBANDS + 1), n2 = l2 / (15 < p2 ? 1152 : 384), x2 = X(c.HBLKSIZE), r2;
        l2 /= k2;
        var u2 = 0, C = 0;
        for (r2 = 0; r2 < c.CBANDS; r2++) {
          var t2;
          var A2 = z(l2 * u2);
          q2[r2] = l2 * u2;
          for (t2 = u2; 0.34 > z(l2 * t2) - A2 && t2 <= k2 / 2; t2++) ;
          a2[r2] = t2 - u2;
          for (C = r2 + 1; u2 < t2; ) x2[u2++] = r2;
          if (u2 > k2 / 2) {
            u2 = k2 / 2;
            ++r2;
            break;
          }
        }
        q2[r2] = l2 * u2;
        for (u2 = 0; u2 < p2; u2++) r2 = m2[u2], A2 = m2[u2 + 1], r2 = 0 | Math.floor(0.5 + y2 * (r2 - 0.5)), 0 > r2 && (r2 = 0), t2 = 0 | Math.floor(0.5 + y2 * (A2 - 0.5)), t2 > k2 / 2 && (t2 = k2 / 2), d2[u2] = (x2[r2] + x2[t2]) / 2, b2[u2] = x2[t2], g2[u2] = (n2 * A2 - q2[b2[u2]]) / (q2[b2[u2] + 1] - q2[b2[u2]]), 0 > g2[u2] ? g2[u2] = 0 : 1 < g2[u2] && (g2[u2] = 1), A2 = z(l2 * m2[u2] * y2), A2 = Math.min(A2, 15.5) / 15.5, e2[u2] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * A2)) - 2.5);
        for (b2 = u2 = 0; b2 < C; b2++) d2 = a2[b2], A2 = z(l2 * u2), e2 = z(l2 * (u2 + d2 - 1)), f2[b2] = 0.5 * (A2 + e2), A2 = z(l2 * (u2 - 0.5)), e2 = z(l2 * (u2 + d2 - 0.5)), h2[b2] = e2 - A2, u2 += d2;
        return C;
      }
      function l(a2, b2, d2, f2, h2, e2) {
        var g2 = ca([c.CBANDS, c.CBANDS]), l2 = 0;
        if (e2) for (var k2 = 0; k2 < b2; k2++) for (e2 = 0; e2 < b2; e2++) {
          var y2 = d2[k2] - d2[e2];
          y2 = 0 <= y2 ? 3 * y2 : 1.5 * y2;
          if (0.5 <= y2 && 2.5 >= y2) {
            var p2 = y2 - 0.5;
            p2 = 8 * (p2 * p2 - 2 * p2);
          } else p2 = 0;
          y2 += 0.474;
          y2 = 15.811389 + 7.5 * y2 - 17.5 * Math.sqrt(1 + y2 * y2);
          -60 >= y2 ? p2 = 0 : (y2 = Math.exp(0.2302585093 * (p2 + y2)), p2 = y2 / 0.6609193);
          y2 = p2 * f2[e2];
          g2[k2][e2] = y2 * h2[k2];
        }
        else for (e2 = 0; e2 < b2; e2++) {
          p2 = 15 + Math.min(21 / d2[e2], 12);
          var q2;
          var n2;
          k2 = p2;
          for (q2 = 0; 1e-20 < m(q2, k2); --q2) ;
          var x2 = q2;
          for (n2 = 0; 1e-12 < Math.abs(n2 - x2); ) q2 = (n2 + x2) / 2, 0 < m(q2, k2) ? n2 = q2 : x2 = q2;
          y2 = x2;
          for (q2 = 0; 1e-20 < m(q2, k2); q2 += 1) ;
          x2 = 0;
          for (n2 = q2; 1e-12 < Math.abs(n2 - x2); ) q2 = (n2 + x2) / 2, 0 < m(q2, k2) ? x2 = q2 : n2 = q2;
          x2 = n2;
          var r2 = 0;
          for (n2 = 0; 1e3 >= n2; ++n2) q2 = y2 + n2 * (x2 - y2) / 1e3, q2 = m(q2, k2), r2 += q2;
          q2 = 1001 / (r2 * (x2 - y2));
          for (k2 = 0; k2 < b2; k2++) y2 = q2 * m(d2[k2] - d2[e2], p2) * f2[e2], g2[k2][e2] = y2 * h2[k2];
        }
        for (k2 = 0; k2 < b2; k2++) {
          for (e2 = 0; e2 < b2 && !(0 < g2[k2][e2]); e2++) ;
          a2[k2][0] = e2;
          for (e2 = b2 - 1; 0 < e2 && !(0 < g2[k2][e2]); e2--) ;
          a2[k2][1] = e2;
          l2 += a2[k2][1] - a2[k2][0] + 1;
        }
        d2 = K(l2);
        for (k2 = f2 = 0; k2 < b2; k2++) for (e2 = a2[k2][0]; e2 <= a2[k2][1]; e2++) d2[f2++] = g2[k2][e2];
        return d2;
      }
      function d(a2) {
        a2 = z(a2);
        a2 = Math.min(a2, 15.5) / 15.5;
        return Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * a2)) - 2.5);
      }
      function g(a2, c2) {
        -0.3 > a2 && (a2 = 3410);
        a2 = Math.max(0.1, a2 / 1e3);
        return 3.64 * Math.pow(a2, -0.8) - 6.8 * Math.exp(-0.6 * Math.pow(a2 - 3.4, 2)) + 6 * Math.exp(-0.15 * Math.pow(a2 - 8.7, 2)) + 1e-3 * (0.6 + 0.04 * c2) * Math.pow(a2, 4);
      }
      var q = new Jc(), D = 1 / 217621504 / (c.BLKSIZE / 2), p, r, t, J = [1, 0.79433, 0.63096, 0.63096, 0.63096, 0.63096, 0.63096, 0.25119, 0.11749], h = [
        3.3246 * 3.3246,
        3.23837 * 3.23837,
        9.9500500969,
        9.0247369744,
        8.1854926609,
        7.0440875649,
        2.46209 * 2.46209,
        2.284 * 2.284,
        4.4892710641,
        1.96552 * 1.96552,
        1.82335 * 1.82335,
        1.69146 * 1.69146,
        2.4621061921,
        2.1508568964,
        1.37074 * 1.37074,
        1.31036 * 1.31036,
        1.5691069696,
        1.4555939904,
        1.16203 * 1.16203,
        1.2715945225,
        1.09428 * 1.09428,
        1.0659 * 1.0659,
        1.0779838276,
        1.0382591025,
        1
      ], x = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1], y = [5.5396212496, 2.29259 * 2.29259, 4.9868695969, 2.12675 * 2.12675, 2.02545 * 2.02545, 1.87894 * 1.87894, 1.74303 * 1.74303, 1.61695 * 1.61695, 2.2499700001, 1.39148 * 1.39148, 1.29083 * 1.29083, 1.19746 * 1.19746, 1.2339655056, 1.0779838276], A = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1], N = [11.8, 13.6, 17.2, 32, 46.5, 51.3, 57.5, 67.1, 71.5, 84.6, 97.6, 130], H = [6.8, 5.8, 5.8, 6.4, 6.5, 9.9, 12.1, 14.4, 15, 18.9, 21.6, 26.9, 34.2, 40.2, 46.8, 56.5, 60.7, 73.9, 85.7, 93.4, 126.1], O = [-1730326e-23, -0.01703172, -1349528e-23, 0.0418072, -673278e-22, -0.0876324, -30835e-21, 0.1863476, -1104424e-22, -0.627638];
      this.L3psycho_anal_ns = function(a2, d2, h2, e2, g2, l2, m2, y2, p2, n2) {
        var x2 = a2.internal_flags, r2 = ca([2, c.BLKSIZE]), t2 = ca([2, 3, c.BLKSIZE_s]), A2 = K(c.CBANDS + 1), I = K(c.CBANDS + 1), C = K(c.CBANDS + 2), Q = X(2), S = X(2), z2, D2, F2, H2, N2, Z, L, V = ca([2, 576]), ma = X(c.CBANDS + 2), R = X(c.CBANDS + 2);
        na.fill(R, 0);
        var T2 = x2.channels_out;
        a2.mode == la.JOINT_STEREO && (T2 = 4);
        var M = a2.VBR == G.vbr_off ? 0 == x2.ResvMax ? 0 : x2.ResvSize / x2.ResvMax * 0.5 : a2.VBR == G.vbr_rh || a2.VBR == G.vbr_mtrh || a2.VBR == G.vbr_mt ? 0.6 : 1;
        for (z2 = 0; z2 < x2.channels_out; z2++) {
          var Y2 = d2[z2], ha = h2 + 576 - 350 - 21 + 192;
          for (F2 = 0; 576 > F2; F2++) {
            var U2;
            var da2 = Y2[ha + F2 + 10];
            for (H2 = U2 = 0; 9 > H2; H2 += 2) da2 += O[H2] * (Y2[ha + F2 + H2] + Y2[ha + F2 + 21 - H2]), U2 += O[H2 + 1] * (Y2[ha + F2 + H2 + 1] + Y2[ha + F2 + 21 - H2 - 1]);
            V[z2][F2] = da2 + U2;
          }
          g2[e2][z2].en.assign(x2.en[z2]);
          g2[e2][z2].thm.assign(x2.thm[z2]);
          2 < T2 && (l2[e2][z2].en.assign(x2.en[z2 + 2]), l2[e2][z2].thm.assign(x2.thm[z2 + 2]));
        }
        for (z2 = 0; z2 < T2; z2++) {
          var Qa = K(12), ya = [0, 0, 0, 0], qa2 = K(12), ia2 = 1, sa2 = K(c.CBANDS), Fa2 = K(c.CBANDS), ta = [0, 0, 0, 0], za2 = K(c.HBLKSIZE), Wb = ca([3, c.HBLKSIZE_s]);
          for (F2 = 0; 3 > F2; F2++) Qa[F2] = x2.nsPsy.last_en_subshort[z2][F2 + 6], qa2[F2] = Qa[F2] / x2.nsPsy.last_en_subshort[z2][F2 + 4], ya[0] += Qa[F2];
          if (2 == z2) for (F2 = 0; 576 > F2; F2++) {
            var Ya = V[0][F2];
            var Xa2 = V[1][F2];
            V[0][F2] = Ya + Xa2;
            V[1][F2] = Ya - Xa2;
          }
          var Ia2 = V[z2 & 1], ec = 0;
          for (F2 = 0; 9 > F2; F2++) {
            for (var xa2 = ec + 64, Ga = 1; ec < xa2; ec++) Ga < Math.abs(Ia2[ec]) && (Ga = Math.abs(Ia2[ec]));
            x2.nsPsy.last_en_subshort[z2][F2] = Qa[F2 + 3] = Ga;
            ya[1 + F2 / 3] += Ga;
            Ga = Ga > Qa[F2 + 3 - 2] ? Ga / Qa[F2 + 3 - 2] : Qa[F2 + 3 - 2] > 10 * Ga ? Qa[F2 + 3 - 2] / (10 * Ga) : 0;
            qa2[F2 + 3] = Ga;
          }
          if (a2.analysis) {
            var Qb = qa2[0];
            for (F2 = 1; 12 > F2; F2++) Qb < qa2[F2] && (Qb = qa2[F2]);
            x2.pinfo.ers[e2][z2] = x2.pinfo.ers_save[z2];
            x2.pinfo.ers_save[z2] = Qb;
          }
          var Ma2 = 3 == z2 ? x2.nsPsy.attackthre_s : x2.nsPsy.attackthre;
          for (F2 = 0; 12 > F2; F2++) 0 == ta[F2 / 3] && qa2[F2] > Ma2 && (ta[F2 / 3] = F2 % 3 + 1);
          for (F2 = 1; 4 > F2; F2++) 1.7 > (ya[F2 - 1] > ya[F2] ? ya[F2 - 1] / ya[F2] : ya[F2] / ya[F2 - 1]) && (ta[F2] = 0, 1 == F2 && (ta[0] = 0));
          0 != ta[0] && 0 != x2.nsPsy.lastAttacks[z2] && (ta[0] = 0);
          if (3 == x2.nsPsy.lastAttacks[z2] || 0 != ta[0] + ta[1] + ta[2] + ta[3]) ia2 = 0, 0 != ta[1] && 0 != ta[0] && (ta[1] = 0), 0 != ta[2] && 0 != ta[1] && (ta[2] = 0), 0 != ta[3] && 0 != ta[2] && (ta[3] = 0);
          2 > z2 ? S[z2] = ia2 : 0 == ia2 && (S[0] = S[1] = 0);
          p2[z2] = x2.tot_ener[z2];
          var P = a2, Ha = za2, Gb = Wb, La = r2, kb = z2 & 1, Ra = t2, Na = z2 & 1, cb = e2, Aa = z2, va = d2, qb2 = h2, Va = P.internal_flags;
          if (2 > Aa) q.fft_long(Va, La[kb], Aa, va, qb2), q.fft_short(Va, Ra[Na], Aa, va, qb2);
          else if (2 == Aa) {
            for (var ja = c.BLKSIZE - 1; 0 <= ja; --ja) {
              var Hb = La[kb + 0][ja], Ib = La[kb + 1][ja];
              La[kb + 0][ja] = (Hb + Ib) * aa.SQRT2 * 0.5;
              La[kb + 1][ja] = (Hb - Ib) * aa.SQRT2 * 0.5;
            }
            for (var Ba = 2; 0 <= Ba; --Ba) for (ja = c.BLKSIZE_s - 1; 0 <= ja; --ja) Hb = Ra[Na + 0][Ba][ja], Ib = Ra[Na + 1][Ba][ja], Ra[Na + 0][Ba][ja] = (Hb + Ib) * aa.SQRT2 * 0.5, Ra[Na + 1][Ba][ja] = (Hb - Ib) * aa.SQRT2 * 0.5;
          }
          Ha[0] = La[kb + 0][0];
          Ha[0] *= Ha[0];
          for (ja = c.BLKSIZE / 2 - 1; 0 <= ja; --ja) {
            var fc = La[kb + 0][c.BLKSIZE / 2 - ja], tb = La[kb + 0][c.BLKSIZE / 2 + ja];
            Ha[c.BLKSIZE / 2 - ja] = 0.5 * (fc * fc + tb * tb);
          }
          for (Ba = 2; 0 <= Ba; --Ba) for (Gb[Ba][0] = Ra[Na + 0][Ba][0], Gb[Ba][0] *= Gb[Ba][0], ja = c.BLKSIZE_s / 2 - 1; 0 <= ja; --ja) fc = Ra[Na + 0][Ba][c.BLKSIZE_s / 2 - ja], tb = Ra[Na + 0][Ba][c.BLKSIZE_s / 2 + ja], Gb[Ba][c.BLKSIZE_s / 2 - ja] = 0.5 * (fc * fc + tb * tb);
          var oa = 0;
          for (ja = 11; ja < c.HBLKSIZE; ja++) oa += Ha[ja];
          Va.tot_ener[Aa] = oa;
          if (P.analysis) {
            for (ja = 0; ja < c.HBLKSIZE; ja++) Va.pinfo.energy[cb][Aa][ja] = Va.pinfo.energy_save[Aa][ja], Va.pinfo.energy_save[Aa][ja] = Ha[ja];
            Va.pinfo.pe[cb][Aa] = Va.pe[Aa];
          }
          2 == P.athaa_loudapprox && 2 > Aa && (Va.loudness_sq[cb][Aa] = Va.loudness_sq_save[Aa], Va.loudness_sq_save[Aa] = u(Ha, Va));
          b(x2, za2, A2, sa2, Fa2);
          v(x2, sa2, Fa2, ma);
          for (L = 0; 3 > L; L++) {
            var ea = void 0, Ab = void 0, Bb = Wb, Sa = I, Za = C, ub = z2, zb2 = L, Ja = a2.internal_flags;
            for (ea = Ab = 0; ea < Ja.npart_s; ++ea) {
              for (var Rb = 0, rb2 = 0, db = Ja.numlines_s[ea], sb2 = 0; sb2 < db; ++sb2, ++Ab) {
                var Cb = Bb[zb2][Ab];
                Rb += Cb;
                rb2 < Cb && (rb2 = Cb);
              }
              Sa[ea] = Rb;
            }
            for (Ab = ea = 0; ea < Ja.npart_s; ea++) {
              var Db = Ja.s3ind_s[ea][0], $a = Ja.s3_ss[Ab++] * Sa[Db];
              for (++Db; Db <= Ja.s3ind_s[ea][1]; ) $a += Ja.s3_ss[Ab] * Sa[Db], ++Ab, ++Db;
              var vb = 2 * Ja.nb_s1[ub][ea];
              Za[ea] = Math.min($a, vb);
              Ja.blocktype_old[ub & 1] == c.SHORT_TYPE && (vb = 16 * Ja.nb_s2[ub][ea], Za[ea] = Math.min(
                vb,
                Za[ea]
              ));
              Ja.nb_s2[ub][ea] = Ja.nb_s1[ub][ea];
              Ja.nb_s1[ub][ea] = $a;
            }
            for (; ea <= c.CBANDS; ++ea) Sa[ea] = 0, Za[ea] = 0;
            w2(x2, I, C, z2, L);
            for (Z = 0; Z < c.SBMAX_s; Z++) {
              var Ta = x2.thm[z2].s[Z][L];
              Ta *= 0.8;
              if (2 <= ta[L] || 1 == ta[L + 1]) {
                var wb = 0 != L ? L - 1 : 2;
                Ga = B(x2.thm[z2].s[Z][wb], Ta, 0.6 * M);
                Ta = Math.min(Ta, Ga);
              }
              if (1 == ta[L]) wb = 0 != L ? L - 1 : 2, Ga = B(x2.thm[z2].s[Z][wb], Ta, 0.3 * M), Ta = Math.min(Ta, Ga);
              else if (0 != L && 3 == ta[L - 1] || 0 == L && 3 == x2.nsPsy.lastAttacks[z2]) wb = 2 != L ? L + 1 : 0, Ga = B(x2.thm[z2].s[Z][wb], Ta, 0.3 * M), Ta = Math.min(Ta, Ga);
              var Yb = Qa[3 * L + 3] + Qa[3 * L + 4] + Qa[3 * L + 5];
              6 * Qa[3 * L + 5] < Yb && (Ta *= 0.5, 6 * Qa[3 * L + 4] < Yb && (Ta *= 0.5));
              x2.thm[z2].s[Z][L] = Ta;
            }
          }
          x2.nsPsy.lastAttacks[z2] = ta[2];
          for (D2 = N2 = 0; D2 < x2.npart_l; D2++) {
            for (var eb = x2.s3ind[D2][0], Jb = A2[eb] * J[ma[eb]], lb = x2.s3_ll[N2++] * Jb; ++eb <= x2.s3ind[D2][1]; ) Jb = A2[eb] * J[ma[eb]], lb = k(lb, x2.s3_ll[N2++] * Jb, eb, eb - D2, x2, 0);
            lb *= 0.158489319246111;
            C[D2] = x2.blocktype_old[z2 & 1] == c.SHORT_TYPE ? lb : B(Math.min(lb, Math.min(2 * x2.nb_1[z2][D2], 16 * x2.nb_2[z2][D2])), lb, M);
            x2.nb_2[z2][D2] = x2.nb_1[z2][D2];
            x2.nb_1[z2][D2] = lb;
          }
          for (; D2 <= c.CBANDS; ++D2) A2[D2] = 0, C[D2] = 0;
          E(x2, A2, C, z2);
        }
        if ((a2.mode == la.STEREO || a2.mode == la.JOINT_STEREO) && 0 < a2.interChRatio) {
          var xb = a2.interChRatio, fa = a2.internal_flags;
          if (1 < fa.channels_out) {
            for (var Ca = 0; Ca < c.SBMAX_l; Ca++) {
              var Sb = fa.thm[0].l[Ca], Eb = fa.thm[1].l[Ca];
              fa.thm[0].l[Ca] += Eb * xb;
              fa.thm[1].l[Ca] += Sb * xb;
            }
            for (Ca = 0; Ca < c.SBMAX_s; Ca++) for (var fb = 0; 3 > fb; fb++) Sb = fa.thm[0].s[Ca][fb], Eb = fa.thm[1].s[Ca][fb], fa.thm[0].s[Ca][fb] += Eb * xb, fa.thm[1].s[Ca][fb] += Sb * xb;
          }
        }
        if (a2.mode == la.JOINT_STEREO) {
          for (var Oa, ka = 0; ka < c.SBMAX_l; ka++) if (!(x2.thm[0].l[ka] > 1.58 * x2.thm[1].l[ka] || x2.thm[1].l[ka] > 1.58 * x2.thm[0].l[ka])) {
            var Ua = x2.mld_l[ka] * x2.en[3].l[ka], gb = Math.max(x2.thm[2].l[ka], Math.min(x2.thm[3].l[ka], Ua));
            Ua = x2.mld_l[ka] * x2.en[2].l[ka];
            var gc = Math.max(x2.thm[3].l[ka], Math.min(x2.thm[2].l[ka], Ua));
            x2.thm[2].l[ka] = gb;
            x2.thm[3].l[ka] = gc;
          }
          for (ka = 0; ka < c.SBMAX_s; ka++) for (var ua = 0; 3 > ua; ua++) x2.thm[0].s[ka][ua] > 1.58 * x2.thm[1].s[ka][ua] || x2.thm[1].s[ka][ua] > 1.58 * x2.thm[0].s[ka][ua] || (Ua = x2.mld_s[ka] * x2.en[3].s[ka][ua], gb = Math.max(x2.thm[2].s[ka][ua], Math.min(x2.thm[3].s[ka][ua], Ua)), Ua = x2.mld_s[ka] * x2.en[2].s[ka][ua], gc = Math.max(x2.thm[3].s[ka][ua], Math.min(x2.thm[2].s[ka][ua], Ua)), x2.thm[2].s[ka][ua] = gb, x2.thm[3].s[ka][ua] = gc);
          Oa = a2.msfix;
          if (0 < Math.abs(Oa)) {
            var Kb = Oa, hc = Kb, Zb = Math.pow(10, a2.ATHlower * x2.ATH.adjust);
            Kb *= 2;
            hc *= 2;
            for (var wa = 0; wa < c.SBMAX_l; wa++) {
              var ba = x2.ATH.cb_l[x2.bm_l[wa]] * Zb;
              var Wa = Math.min(Math.max(x2.thm[0].l[wa], ba), Math.max(x2.thm[1].l[wa], ba));
              var ab = Math.max(x2.thm[2].l[wa], ba);
              var mb = Math.max(x2.thm[3].l[wa], ba);
              if (Wa * Kb < ab + mb) {
                var hb = Wa * hc / (ab + mb);
                ab *= hb;
                mb *= hb;
              }
              x2.thm[2].l[wa] = Math.min(ab, x2.thm[2].l[wa]);
              x2.thm[3].l[wa] = Math.min(mb, x2.thm[3].l[wa]);
            }
            Zb *= c.BLKSIZE_s / c.BLKSIZE;
            for (wa = 0; wa < c.SBMAX_s; wa++) for (var Da = 0; 3 > Da; Da++) ba = x2.ATH.cb_s[x2.bm_s[wa]] * Zb, Wa = Math.min(Math.max(x2.thm[0].s[wa][Da], ba), Math.max(x2.thm[1].s[wa][Da], ba)), ab = Math.max(x2.thm[2].s[wa][Da], ba), mb = Math.max(x2.thm[3].s[wa][Da], ba), Wa * Kb < ab + mb && (hb = Wa * Kb / (ab + mb), ab *= hb, mb *= hb), x2.thm[2].s[wa][Da] = Math.min(x2.thm[2].s[wa][Da], ab), x2.thm[3].s[wa][Da] = Math.min(x2.thm[3].s[wa][Da], mb);
          }
        }
        var ib = a2.internal_flags;
        a2.short_blocks != ra.short_block_coupled || 0 != S[0] && 0 != S[1] || (S[0] = S[1] = 0);
        for (var Ka = 0; Ka < ib.channels_out; Ka++) Q[Ka] = c.NORM_TYPE, a2.short_blocks == ra.short_block_dispensed && (S[Ka] = 1), a2.short_blocks == ra.short_block_forced && (S[Ka] = 0), 0 != S[Ka] ? ib.blocktype_old[Ka] == c.SHORT_TYPE && (Q[Ka] = c.STOP_TYPE) : (Q[Ka] = c.SHORT_TYPE, ib.blocktype_old[Ka] == c.NORM_TYPE && (ib.blocktype_old[Ka] = c.START_TYPE), ib.blocktype_old[Ka] == c.STOP_TYPE && (ib.blocktype_old[Ka] = c.SHORT_TYPE)), n2[Ka] = ib.blocktype_old[Ka], ib.blocktype_old[Ka] = Q[Ka];
        for (z2 = 0; z2 < T2; z2++) {
          var Ea = 0;
          if (1 < z2) {
            var Lb = y2;
            Ea = -2;
            var Tb = c.NORM_TYPE;
            if (n2[0] == c.SHORT_TYPE || n2[1] == c.SHORT_TYPE) Tb = c.SHORT_TYPE;
            var Fb = l2[e2][z2 - 2];
          } else Lb = m2, Ea = 0, Tb = n2[z2], Fb = g2[e2][z2];
          Lb[Ea + z2] = Tb == c.SHORT_TYPE ? W2(Fb, x2.masking_lower) : f(Fb, x2.masking_lower);
          a2.analysis && (x2.pinfo.pe[e2][z2] = Lb[Ea + z2]);
        }
        return 0;
      };
      var F = [-1730326e-23, -0.01703172, -1349528e-23, 0.0418072, -673278e-22, -0.0876324, -30835e-21, 0.1863476, -1104424e-22, -0.627638];
      this.L3psycho_anal_vbr = function(d2, h2, e2, g2, l2, k2, m2, x2, y2, p2) {
        for (var r2 = d2.internal_flags, A2, t2, I = K(c.HBLKSIZE), C = ca([3, c.HBLKSIZE_s]), Q = ca([2, c.BLKSIZE]), z2 = ca([2, 3, c.BLKSIZE_s]), S = ca([4, c.CBANDS]), D2 = ca([4, c.CBANDS]), O2 = ca([4, 3]), L = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], H2 = X(2), N2 = d2.mode == la.JOINT_STEREO ? 4 : r2.channels_out, Z = ca([2, 576]), G2 = d2.internal_flags, V = G2.channels_out, ma = d2.mode == la.JOINT_STEREO ? 4 : V, R = 0; R < V; R++) {
          firbuf = h2[R];
          for (var T2 = e2 + 576 - 350 - 21 + 192, M = 0; 576 > M; M++) {
            var Y2;
            var ha = firbuf[T2 + M + 10];
            for (var U2 = Y2 = 0; 9 > U2; U2 += 2) ha += F[U2] * (firbuf[T2 + M + U2] + firbuf[T2 + M + 21 - U2]), Y2 += F[U2 + 1] * (firbuf[T2 + M + U2 + 1] + firbuf[T2 + M + 21 - U2 - 1]);
            Z[R][M] = ha + Y2;
          }
          l2[g2][R].en.assign(G2.en[R]);
          l2[g2][R].thm.assign(G2.thm[R]);
          2 < ma && (k2[g2][R].en.assign(G2.en[R + 2]), k2[g2][R].thm.assign(G2.thm[R + 2]));
        }
        for (R = 0; R < ma; R++) {
          var da2 = K(12), ya = K(12), qa2 = [0, 0, 0, 0], ia2 = Z[R & 1], sa2 = 0, Fa2 = 3 == R ? G2.nsPsy.attackthre_s : G2.nsPsy.attackthre, na2 = 1;
          if (2 == R) for (M = 0, U2 = 576; 0 < U2; ++M, --U2) {
            var ta = Z[0][M], za2 = Z[1][M];
            Z[0][M] = ta + za2;
            Z[1][M] = ta - za2;
          }
          for (M = 0; 3 > M; M++) ya[M] = G2.nsPsy.last_en_subshort[R][M + 6], da2[M] = ya[M] / G2.nsPsy.last_en_subshort[R][M + 4], qa2[0] += ya[M];
          for (M = 0; 9 > M; M++) {
            for (var Xa2 = sa2 + 64, Ya = 1; sa2 < Xa2; sa2++) Ya < Math.abs(ia2[sa2]) && (Ya = Math.abs(ia2[sa2]));
            G2.nsPsy.last_en_subshort[R][M] = ya[M + 3] = Ya;
            qa2[1 + M / 3] += Ya;
            Ya = Ya > ya[M + 3 - 2] ? Ya / ya[M + 3 - 2] : ya[M + 3 - 2] > 10 * Ya ? ya[M + 3 - 2] / (10 * Ya) : 0;
            da2[M + 3] = Ya;
          }
          for (M = 0; 3 > M; ++M) {
            var Ia2 = ya[3 * M + 3] + ya[3 * M + 4] + ya[3 * M + 5], Wb = 1;
            6 * ya[3 * M + 5] < Ia2 && (Wb *= 0.5, 6 * ya[3 * M + 4] < Ia2 && (Wb *= 0.5));
            O2[R][M] = Wb;
          }
          if (d2.analysis) {
            var xa2 = da2[0];
            for (M = 1; 12 > M; M++) xa2 < da2[M] && (xa2 = da2[M]);
            G2.pinfo.ers[g2][R] = G2.pinfo.ers_save[R];
            G2.pinfo.ers_save[R] = xa2;
          }
          for (M = 0; 12 > M; M++) 0 == L[R][M / 3] && da2[M] > Fa2 && (L[R][M / 3] = M % 3 + 1);
          for (M = 1; 4 > M; M++) {
            var Qb = qa2[M - 1], Ga = qa2[M];
            4e4 > Math.max(Qb, Ga) && Qb < 1.7 * Ga && Ga < 1.7 * Qb && (1 == M && L[R][0] <= L[R][M] && (L[R][0] = 0), L[R][M] = 0);
          }
          L[R][0] <= G2.nsPsy.lastAttacks[R] && (L[R][0] = 0);
          if (3 == G2.nsPsy.lastAttacks[R] || 0 != L[R][0] + L[R][1] + L[R][2] + L[R][3]) na2 = 0, 0 != L[R][1] && 0 != L[R][0] && (L[R][1] = 0), 0 != L[R][2] && 0 != L[R][1] && (L[R][2] = 0), 0 != L[R][3] && 0 != L[R][2] && (L[R][3] = 0);
          2 > R ? H2[R] = na2 : 0 == na2 && (H2[0] = H2[1] = 0);
          y2[R] = G2.tot_ener[R];
        }
        var qb2 = d2.internal_flags;
        d2.short_blocks != ra.short_block_coupled || 0 != H2[0] && 0 != H2[1] || (H2[0] = H2[1] = 0);
        for (var Ma2 = 0; Ma2 < qb2.channels_out; Ma2++) d2.short_blocks == ra.short_block_dispensed && (H2[Ma2] = 1), d2.short_blocks == ra.short_block_forced && (H2[Ma2] = 0);
        for (var P = 0; P < N2; P++) {
          var Ha = P & 1;
          A2 = Q;
          var Gb = d2, La = P, kb = g2, Ra = I, Na = A2, cb = Ha, Aa = Gb.internal_flags;
          if (2 > La) q.fft_long(Aa, Na[cb], La, h2, e2);
          else if (2 == La) for (var va = c.BLKSIZE - 1; 0 <= va; --va) {
            var rb2 = Na[cb + 0][va], Va = Na[cb + 1][va];
            Na[cb + 0][va] = (rb2 + Va) * aa.SQRT2 * 0.5;
            Na[cb + 1][va] = (rb2 - Va) * aa.SQRT2 * 0.5;
          }
          Ra[0] = Na[cb + 0][0];
          Ra[0] *= Ra[0];
          for (va = c.BLKSIZE / 2 - 1; 0 <= va; --va) {
            var ja = Na[cb + 0][c.BLKSIZE / 2 - va], Hb = Na[cb + 0][c.BLKSIZE / 2 + va];
            Ra[c.BLKSIZE / 2 - va] = 0.5 * (ja * ja + Hb * Hb);
          }
          var Ib = 0;
          for (va = 11; va < c.HBLKSIZE; va++) Ib += Ra[va];
          Aa.tot_ener[La] = Ib;
          if (Gb.analysis) {
            for (va = 0; va < c.HBLKSIZE; va++) Aa.pinfo.energy[kb][La][va] = Aa.pinfo.energy_save[La][va], Aa.pinfo.energy_save[La][va] = Ra[va];
            Aa.pinfo.pe[kb][La] = Aa.pe[La];
          }
          var Ba = P, zb2 = I, tb = d2.internal_flags;
          2 == d2.athaa_loudapprox && 2 > Ba && (tb.loudness_sq[g2][Ba] = tb.loudness_sq_save[Ba], tb.loudness_sq_save[Ba] = u(zb2, tb));
          if (0 != H2[Ha]) {
            var oa = void 0, ea = r2, Ab = I, Bb = S[P], Sa = D2[P], Za = P, ub = K(c.CBANDS), sb2 = K(c.CBANDS), Ja = X(c.CBANDS + 2);
            b(ea, Ab, Bb, ub, sb2);
            v(
              ea,
              ub,
              sb2,
              Ja
            );
            var Rb = 0;
            for (oa = 0; oa < ea.npart_l; oa++) {
              var Xb2, db = ea.s3ind[oa][0], cc2 = ea.s3ind[oa][1], Cb = 0, Db = 0;
              Cb = Ja[db];
              Db += 1;
              var $a = ea.s3_ll[Rb] * Bb[db] * J[Ja[db]];
              ++Rb;
              for (++db; db <= cc2; ) {
                Cb += Ja[db];
                Db += 1;
                var vb = ea.s3_ll[Rb] * Bb[db] * J[Ja[db]];
                $a = Xb2 = n($a, vb, db - oa);
                ++Rb;
                ++db;
              }
              Cb = (1 + 2 * Cb) / (2 * Db);
              var Ta = 0.5 * J[Cb];
              $a *= Ta;
              if (ea.blocktype_old[Za & 1] == c.SHORT_TYPE) {
                var wb = 2 * ea.nb_1[Za][oa];
                Sa[oa] = 0 < wb ? Math.min($a, wb) : Math.min($a, 0.3 * Bb[oa]);
              } else {
                var Yb = 16 * ea.nb_2[Za][oa], eb = 2 * ea.nb_1[Za][oa];
                0 >= Yb && (Yb = $a);
                0 >= eb && (eb = $a);
                wb = ea.blocktype_old[Za & 1] == c.NORM_TYPE ? Math.min(eb, Yb) : eb;
                Sa[oa] = Math.min($a, wb);
              }
              ea.nb_2[Za][oa] = ea.nb_1[Za][oa];
              ea.nb_1[Za][oa] = $a;
              vb = ub[oa];
              vb *= ea.minval_l[oa];
              vb *= Ta;
              Sa[oa] > vb && (Sa[oa] = vb);
              1 < ea.masking_lower && (Sa[oa] *= ea.masking_lower);
              Sa[oa] > Bb[oa] && (Sa[oa] = Bb[oa]);
              1 > ea.masking_lower && (Sa[oa] *= ea.masking_lower);
            }
            for (; oa < c.CBANDS; ++oa) Bb[oa] = 0, Sa[oa] = 0;
          } else for (var Jb = r2, lb = P, xb = 0; xb < Jb.npart_l; xb++) Jb.nb_2[lb][xb] = Jb.nb_1[lb][xb], Jb.nb_1[lb][xb] = 0;
        }
        2 == H2[0] + H2[1] && d2.mode == la.JOINT_STEREO && a(
          S,
          D2,
          r2.mld_cb_l,
          r2.ATH.cb_l,
          d2.ATHlower * r2.ATH.adjust,
          d2.msfix,
          r2.npart_l
        );
        for (P = 0; P < N2; P++) Ha = P & 1, 0 != H2[Ha] && E(r2, S[P], D2[P], P);
        for (var fa = 0; 3 > fa; fa++) {
          for (P = 0; P < N2; ++P) if (Ha = P & 1, 0 != H2[Ha]) {
            var Ca = r2, Sb = P;
            if (0 == fa) for (var Eb = 0; Eb < Ca.npart_s; Eb++) Ca.nb_s2[Sb][Eb] = Ca.nb_s1[Sb][Eb], Ca.nb_s1[Sb][Eb] = 0;
          } else {
            t2 = z2;
            var fb = P, Oa = fa, ka = C, Ua = t2, gb = Ha, gc = d2.internal_flags;
            0 == Oa && 2 > fb && q.fft_short(gc, Ua[gb], fb, h2, e2);
            if (2 == fb) for (var ua = c.BLKSIZE_s - 1; 0 <= ua; --ua) {
              var Kb = Ua[gb + 0][Oa][ua], hc = Ua[gb + 1][Oa][ua];
              Ua[gb + 0][Oa][ua] = (Kb + hc) * aa.SQRT2 * 0.5;
              Ua[gb + 1][Oa][ua] = (Kb - hc) * aa.SQRT2 * 0.5;
            }
            ka[Oa][0] = Ua[gb + 0][Oa][0];
            ka[Oa][0] *= ka[Oa][0];
            for (ua = c.BLKSIZE_s / 2 - 1; 0 <= ua; --ua) {
              var Zb = Ua[gb + 0][Oa][c.BLKSIZE_s / 2 - ua], wa = Ua[gb + 0][Oa][c.BLKSIZE_s / 2 + ua];
              ka[Oa][c.BLKSIZE_s / 2 - ua] = 0.5 * (Zb * Zb + wa * wa);
            }
            var ba = void 0, Wa = void 0, ab = void 0, mb = C, hb = S[P], Da = D2[P], ib = P, Ka = fa, Ea = d2.internal_flags, Lb = new float[c.CBANDS](), Tb = K(c.CBANDS), Fb = new int[c.CBANDS]();
            for (ba = Wa = 0; ba < Ea.npart_s; ++ba) {
              var Ob2 = 0, Pb2 = 0, dc2 = Ea.numlines_s[ba];
              for (ab = 0; ab < dc2; ++ab, ++Wa) {
                var nc = mb[Ka][Wa];
                Ob2 += nc;
                Pb2 < nc && (Pb2 = nc);
              }
              hb[ba] = Ob2;
              Lb[ba] = Pb2;
              Tb[ba] = Ob2 / dc2;
            }
            for (; ba < c.CBANDS; ++ba) Lb[ba] = 0, Tb[ba] = 0;
            var Mb = Ea, nb = Lb, Ub = Tb, $b = Fb, ac = J.length - 1, pa = 0, Pa = Ub[pa] + Ub[pa + 1];
            if (0 < Pa) {
              var bb = nb[pa];
              bb < nb[pa + 1] && (bb = nb[pa + 1]);
              Pa = 20 * (2 * bb - Pa) / (Pa * (Mb.numlines_s[pa] + Mb.numlines_s[pa + 1] - 1));
              var ob = 0 | Pa;
              ob > ac && (ob = ac);
              $b[pa] = ob;
            } else $b[pa] = 0;
            for (pa = 1; pa < Mb.npart_s - 1; pa++) Pa = Ub[pa - 1] + Ub[pa] + Ub[pa + 1], 0 < Pa ? (bb = nb[pa - 1], bb < nb[pa] && (bb = nb[pa]), bb < nb[pa + 1] && (bb = nb[pa + 1]), Pa = 20 * (3 * bb - Pa) / (Pa * (Mb.numlines_s[pa - 1] + Mb.numlines_s[pa] + Mb.numlines_s[pa + 1] - 1)), ob = 0 | Pa, ob > ac && (ob = ac), $b[pa] = ob) : $b[pa] = 0;
            Pa = Ub[pa - 1] + Ub[pa];
            0 < Pa ? (bb = nb[pa - 1], bb < nb[pa] && (bb = nb[pa]), Pa = 20 * (2 * bb - Pa) / (Pa * (Mb.numlines_s[pa - 1] + Mb.numlines_s[pa] - 1)), ob = 0 | Pa, ob > ac && (ob = ac), $b[pa] = ob) : $b[pa] = 0;
            for (Wa = ba = 0; ba < Ea.npart_s; ba++) {
              var yb = Ea.s3ind_s[ba][0], mc2 = Ea.s3ind_s[ba][1];
              var lc = Fb[yb];
              var tc = 1;
              var ic = Ea.s3_ss[Wa] * hb[yb] * J[Fb[yb]];
              ++Wa;
              for (++yb; yb <= mc2; ) {
                lc += Fb[yb];
                tc += 1;
                var bc = Ea.s3_ss[Wa] * hb[yb] * J[Fb[yb]];
                ic = n(ic, bc, yb - ba);
                ++Wa;
                ++yb;
              }
              lc = (1 + 2 * lc) / (2 * tc);
              var uc = 0.5 * J[lc];
              ic *= uc;
              Da[ba] = ic;
              Ea.nb_s2[ib][ba] = Ea.nb_s1[ib][ba];
              Ea.nb_s1[ib][ba] = ic;
              bc = Lb[ba];
              bc *= Ea.minval_s[ba];
              bc *= uc;
              Da[ba] > bc && (Da[ba] = bc);
              1 < Ea.masking_lower && (Da[ba] *= Ea.masking_lower);
              Da[ba] > hb[ba] && (Da[ba] = hb[ba]);
              1 > Ea.masking_lower && (Da[ba] *= Ea.masking_lower);
            }
            for (; ba < c.CBANDS; ++ba) hb[ba] = 0, Da[ba] = 0;
          }
          0 == H2[0] + H2[1] && d2.mode == la.JOINT_STEREO && a(S, D2, r2.mld_cb_s, r2.ATH.cb_s, d2.ATHlower * r2.ATH.adjust, d2.msfix, r2.npart_s);
          for (P = 0; P < N2; ++P) Ha = P & 1, 0 == H2[Ha] && w2(r2, S[P], D2[P], P, fa);
        }
        for (P = 0; P < N2; P++) if (Ha = P & 1, 0 == H2[Ha]) for (var Vb = 0; Vb < c.SBMAX_s; Vb++) {
          var vc = K(3);
          for (fa = 0; 3 > fa; fa++) {
            var jb = r2.thm[P].s[Vb][fa];
            jb *= 0.8;
            if (2 <= L[P][fa] || 1 == L[P][fa + 1]) {
              var jc = 0 != fa ? fa - 1 : 2, kc = B(r2.thm[P].s[Vb][jc], jb, 0.36);
              jb = Math.min(jb, kc);
            } else if (1 == L[P][fa]) jc = 0 != fa ? fa - 1 : 2, kc = B(r2.thm[P].s[Vb][jc], jb, 0.18), jb = Math.min(jb, kc);
            else if (0 != fa && 3 == L[P][fa - 1] || 0 == fa && 3 == r2.nsPsy.lastAttacks[P]) jc = 2 != fa ? fa + 1 : 0, kc = B(r2.thm[P].s[Vb][jc], jb, 0.18), jb = Math.min(jb, kc);
            jb *= O2[P][fa];
            vc[fa] = jb;
          }
          for (fa = 0; 3 > fa; fa++) r2.thm[P].s[Vb][fa] = vc[fa];
        }
        for (P = 0; P < N2; P++) r2.nsPsy.lastAttacks[P] = L[P][2];
        for (var Nb = d2.internal_flags, pb = 0; pb < Nb.channels_out; pb++) {
          var oc = c.NORM_TYPE;
          0 != H2[pb] ? Nb.blocktype_old[pb] == c.SHORT_TYPE && (oc = c.STOP_TYPE) : (oc = c.SHORT_TYPE, Nb.blocktype_old[pb] == c.NORM_TYPE && (Nb.blocktype_old[pb] = c.START_TYPE), Nb.blocktype_old[pb] == c.STOP_TYPE && (Nb.blocktype_old[pb] = c.SHORT_TYPE));
          p2[pb] = Nb.blocktype_old[pb];
          Nb.blocktype_old[pb] = oc;
        }
        for (P = 0; P < N2; P++) {
          if (1 < P) {
            var pc = x2;
            var qc = -2;
            var rc = c.NORM_TYPE;
            if (p2[0] == c.SHORT_TYPE || p2[1] == c.SHORT_TYPE) rc = c.SHORT_TYPE;
            var sc = k2[g2][P - 2];
          } else pc = m2, qc = 0, rc = p2[P], sc = l2[g2][P];
          pc[qc + P] = rc == c.SHORT_TYPE ? W2(sc, r2.masking_lower) : f(sc, r2.masking_lower);
          d2.analysis && (r2.pinfo.pe[g2][P] = pc[qc + P]);
        }
        return 0;
      };
      this.psymodel_init = function(a2) {
        var b2 = a2.internal_flags, f2, h2 = true, g2 = 13, k2 = 0, m2 = 0, x2 = -8.25, y2 = -4.5, n2 = K(c.CBANDS), u2 = K(c.CBANDS), A2 = K(c.CBANDS), w3 = a2.out_samplerate;
        switch (a2.experimentalZ) {
          default:
          case 0:
            h2 = true;
            break;
          case 1:
            h2 = a2.VBR == G.vbr_mtrh || a2.VBR == G.vbr_mt ? false : true;
            break;
          case 2:
            h2 = false;
            break;
          case 3:
            g2 = 8, k2 = -1.75, m2 = -0.0125, x2 = -8.25, y2 = -2.25;
        }
        b2.ms_ener_ratio_old = 0.25;
        b2.blocktype_old[0] = b2.blocktype_old[1] = c.NORM_TYPE;
        for (f2 = 0; 4 > f2; ++f2) {
          for (var v2 = 0; v2 < c.CBANDS; ++v2) b2.nb_1[f2][v2] = 1e20, b2.nb_2[f2][v2] = 1e20, b2.nb_s1[f2][v2] = b2.nb_s2[f2][v2] = 1;
          for (var z2 = 0; z2 < c.SBMAX_l; z2++) b2.en[f2].l[z2] = 1e20, b2.thm[f2].l[z2] = 1e20;
          for (v2 = 0; 3 > v2; ++v2) {
            for (z2 = 0; z2 < c.SBMAX_s; z2++) b2.en[f2].s[z2][v2] = 1e20, b2.thm[f2].s[z2][v2] = 1e20;
            b2.nsPsy.lastAttacks[f2] = 0;
          }
          for (v2 = 0; 9 > v2; v2++) b2.nsPsy.last_en_subshort[f2][v2] = 10;
        }
        b2.loudness_sq_save[0] = b2.loudness_sq_save[1] = 0;
        b2.npart_l = e(
          b2.numlines_l,
          b2.bo_l,
          b2.bm_l,
          n2,
          u2,
          b2.mld_l,
          b2.PSY.bo_l_weight,
          w3,
          c.BLKSIZE,
          b2.scalefac_band.l,
          c.BLKSIZE / 1152,
          c.SBMAX_l
        );
        for (f2 = 0; f2 < b2.npart_l; f2++) z2 = k2, n2[f2] >= g2 && (z2 = m2 * (n2[f2] - g2) / (24 - g2) + k2 * (24 - n2[f2]) / (24 - g2)), A2[f2] = Math.pow(10, z2 / 10), b2.rnumlines_l[f2] = 0 < b2.numlines_l[f2] ? 1 / b2.numlines_l[f2] : 0;
        b2.s3_ll = l(b2.s3ind, b2.npart_l, n2, u2, A2, h2);
        for (f2 = v2 = 0; f2 < b2.npart_l; f2++) {
          m2 = Ma.MAX_VALUE;
          for (z2 = 0; z2 < b2.numlines_l[f2]; z2++, v2++) k2 = w3 * v2 / (1e3 * c.BLKSIZE), k2 = this.ATHformula(1e3 * k2, a2) - 20, k2 = Math.pow(10, 0.1 * k2), k2 *= b2.numlines_l[f2], m2 > k2 && (m2 = k2);
          b2.ATH.cb_l[f2] = m2;
          m2 = -20 + 20 * n2[f2] / 10;
          6 < m2 && (m2 = 100);
          -15 > m2 && (m2 = -15);
          m2 -= 8;
          b2.minval_l[f2] = Math.pow(10, m2 / 10) * b2.numlines_l[f2];
        }
        b2.npart_s = e(b2.numlines_s, b2.bo_s, b2.bm_s, n2, u2, b2.mld_s, b2.PSY.bo_s_weight, w3, c.BLKSIZE_s, b2.scalefac_band.s, c.BLKSIZE_s / 384, c.SBMAX_s);
        for (f2 = v2 = 0; f2 < b2.npart_s; f2++) {
          z2 = x2;
          n2[f2] >= g2 && (z2 = y2 * (n2[f2] - g2) / (24 - g2) + x2 * (24 - n2[f2]) / (24 - g2));
          A2[f2] = Math.pow(10, z2 / 10);
          m2 = Ma.MAX_VALUE;
          for (z2 = 0; z2 < b2.numlines_s[f2]; z2++, v2++) k2 = w3 * v2 / (1e3 * c.BLKSIZE_s), k2 = this.ATHformula(1e3 * k2, a2) - 20, k2 = Math.pow(10, 0.1 * k2), k2 *= b2.numlines_s[f2], m2 > k2 && (m2 = k2);
          b2.ATH.cb_s[f2] = m2;
          m2 = -7 + 7 * n2[f2] / 12;
          12 < n2[f2] && (m2 *= 1 + 3.1 * Math.log(1 + m2));
          12 > n2[f2] && (m2 *= 1 + 2.3 * Math.log(1 - m2));
          -15 > m2 && (m2 = -15);
          m2 -= 8;
          b2.minval_s[f2] = Math.pow(10, m2 / 10) * b2.numlines_s[f2];
        }
        b2.s3_ss = l(b2.s3ind_s, b2.npart_s, n2, u2, A2, h2);
        p = Math.pow(10, 0.5625);
        r = Math.pow(10, 1.5);
        t = Math.pow(10, 1.5);
        q.init_fft(b2);
        b2.decay = Math.exp(-2.302585092994046 / (0.01 * w3 / 192));
        f2 = 3.5;
        0 != (a2.exp_nspsytune & 2) && (f2 = 1);
        0 < Math.abs(a2.msfix) && (f2 = a2.msfix);
        a2.msfix = f2;
        for (h2 = 0; h2 < b2.npart_l; h2++) b2.s3ind[h2][1] > b2.npart_l - 1 && (b2.s3ind[h2][1] = b2.npart_l - 1);
        b2.ATH.decay = Math.pow(10, 576 * b2.mode_gr / w3 * -1.2);
        b2.ATH.adjust = 0.01;
        b2.ATH.adjustLimit = 1;
        if (-1 != a2.ATHtype) {
          v2 = a2.out_samplerate / c.BLKSIZE;
          for (f2 = k2 = h2 = 0; f2 < c.BLKSIZE / 2; ++f2) k2 += v2, b2.ATH.eql_w[f2] = 1 / Math.pow(10, this.ATHformula(k2, a2) / 10), h2 += b2.ATH.eql_w[f2];
          h2 = 1 / h2;
          for (f2 = c.BLKSIZE / 2; 0 <= --f2; ) b2.ATH.eql_w[f2] *= h2;
        }
        for (h2 = v2 = 0; h2 < b2.npart_s; ++h2) for (f2 = 0; f2 < b2.numlines_s[h2]; ++f2) ++v2;
        for (h2 = v2 = 0; h2 < b2.npart_l; ++h2) for (f2 = 0; f2 < b2.numlines_l[h2]; ++f2) ++v2;
        for (f2 = v2 = 0; f2 < b2.npart_l; f2++) k2 = w3 * (v2 + b2.numlines_l[f2] / 2) / (1 * c.BLKSIZE), b2.mld_cb_l[f2] = d(k2), v2 += b2.numlines_l[f2];
        for (; f2 < c.CBANDS; ++f2) b2.mld_cb_l[f2] = 1;
        for (f2 = v2 = 0; f2 < b2.npart_s; f2++) k2 = w3 * (v2 + b2.numlines_s[f2] / 2) / (1 * c.BLKSIZE_s), b2.mld_cb_s[f2] = d(k2), v2 += b2.numlines_s[f2];
        for (; f2 < c.CBANDS; ++f2) b2.mld_cb_s[f2] = 1;
        return 0;
      };
      this.ATHformula = function(a2, b2) {
        switch (b2.ATHtype) {
          case 0:
            a2 = g(a2, 9);
            break;
          case 1:
            a2 = g(a2, -1);
            break;
          case 2:
            a2 = g(a2, 0);
            break;
          case 3:
            a2 = g(a2, 1) + 6;
            break;
          case 4:
            a2 = g(a2, b2.ATHcurve);
            break;
          default:
            a2 = g(a2, 0);
        }
        return a2;
      };
    }
    function W() {
      function u() {
        this.mask_adjust_short = this.mask_adjust = 0;
        this.bo_l_weight = K(c.SBMAX_l);
        this.bo_s_weight = K(c.SBMAX_s);
      }
      function k() {
        this.lowerlimit = 0;
      }
      function n(a2, b2) {
        this.lowpass = b2;
      }
      function V(a2) {
        return 1 < a2 ? 0 : 0 >= a2 ? 1 : Math.cos(Math.PI / 2 * a2);
      }
      function E(a2, b2) {
        switch (a2) {
          case 44100:
            return b2.version = 1, 0;
          case 48e3:
            return b2.version = 1;
          case 32e3:
            return b2.version = 1, 2;
          case 22050:
            return b2.version = 0;
          case 24e3:
            return b2.version = 0, 1;
          case 16e3:
            return b2.version = 0, 2;
          case 11025:
            return b2.version = 0;
          case 12e3:
            return b2.version = 0, 1;
          case 8e3:
            return b2.version = 0, 2;
          default:
            return b2.version = 0, -1;
        }
      }
      function B(a2, b2, d2) {
        16e3 > d2 && (b2 = 2);
        d2 = w.bitrate_table[b2][1];
        for (var c2 = 2; 14 >= c2; c2++) 0 < w.bitrate_table[b2][c2] && Math.abs(w.bitrate_table[b2][c2] - a2) < Math.abs(d2 - a2) && (d2 = w.bitrate_table[b2][c2]);
        return d2;
      }
      function U2(a2, b2, d2) {
        16e3 > d2 && (b2 = 2);
        for (d2 = 0; 14 >= d2; d2++) if (0 < w.bitrate_table[b2][d2] && w.bitrate_table[b2][d2] == a2) return d2;
        return -1;
      }
      function f(a2, b2) {
        var d2 = [new n(8, 2e3), new n(16, 3700), new n(24, 3900), new n(32, 5500), new n(40, 7e3), new n(48, 7500), new n(56, 1e4), new n(64, 11e3), new n(80, 13500), new n(96, 15100), new n(112, 15600), new n(128, 17e3), new n(160, 17500), new n(192, 18600), new n(224, 19400), new n(256, 19700), new n(320, 20500)];
        b2 = e.nearestBitrateFullIndex(b2);
        a2.lowerlimit = d2[b2].lowpass;
      }
      function b(a2) {
        var b2 = c.BLKSIZE + a2.framesize - c.FFTOFFSET;
        return b2 = Math.max(
          b2,
          512 + a2.framesize - 32
        );
      }
      function v(f2, g2, k2, p2, q2, n2, r2) {
        var h = f2.internal_flags, x = 0, y = [null, null], u2 = [null, null];
        if (4294479419 != h.Class_ID) return -3;
        if (0 == p2) return 0;
        var t2 = d.copy_buffer(h, q2, n2, r2, 0);
        if (0 > t2) return t2;
        n2 += t2;
        x += t2;
        u2[0] = g2;
        u2[1] = k2;
        if (qa.NEQ(f2.scale, 0) && qa.NEQ(f2.scale, 1)) for (t2 = 0; t2 < p2; ++t2) u2[0][t2] *= f2.scale, 2 == h.channels_out && (u2[1][t2] *= f2.scale);
        if (qa.NEQ(f2.scale_left, 0) && qa.NEQ(f2.scale_left, 1)) for (t2 = 0; t2 < p2; ++t2) u2[0][t2] *= f2.scale_left;
        if (qa.NEQ(f2.scale_right, 0) && qa.NEQ(f2.scale_right, 1)) for (t2 = 0; t2 < p2; ++t2) u2[1][t2] *= f2.scale_right;
        if (2 == f2.num_channels && 1 == h.channels_out) for (t2 = 0; t2 < p2; ++t2) u2[0][t2] = 0.5 * (u2[0][t2] + u2[1][t2]), u2[1][t2] = 0;
        g2 = b(f2);
        y[0] = h.mfbuf[0];
        y[1] = h.mfbuf[1];
        for (k2 = 0; 0 < p2; ) {
          var v2 = [null, null];
          v2[0] = u2[0];
          v2[1] = u2[1];
          t2 = new a();
          var A = f2;
          var w2 = y;
          var B2 = k2, E2 = p2, D2 = t2, H = A.internal_flags;
          if (0.9999 > H.resample_ratio || 1.0001 < H.resample_ratio) for (var O = 0; O < H.channels_out; O++) {
            var G2 = new m(), J2 = D2, N, V2 = w2[O], T2 = H.mf_size, U3 = A.framesize, W2 = v2[O], X2 = B2, aa2 = E2, ha = G2, la2 = O, ca2 = A.internal_flags, ia2 = 0, sa2 = A.out_samplerate / z(A.out_samplerate, A.in_samplerate);
            sa2 > da.BPC && (sa2 = da.BPC);
            var ra2 = 1e-4 > Math.abs(ca2.resample_ratio - Math.floor(0.5 + ca2.resample_ratio)) ? 1 : 0;
            var R = 1 / ca2.resample_ratio;
            1 < R && (R = 1);
            var na2 = 31;
            0 == na2 % 2 && --na2;
            na2 += ra2;
            ra2 = na2 + 1;
            if (0 == ca2.fill_buffer_resample_init) {
              ca2.inbuf_old[0] = K(ra2);
              ca2.inbuf_old[1] = K(ra2);
              for (N = 0; N <= 2 * sa2; ++N) ca2.blackfilt[N] = K(ra2);
              ca2.itime[0] = 0;
              for (ia2 = ca2.itime[1] = 0; ia2 <= 2 * sa2; ia2++) {
                var M = 0, za2 = (ia2 - sa2) / (2 * sa2);
                for (N = 0; N <= na2; N++) {
                  var Fa2 = ca2.blackfilt[ia2], Ia2 = N, xa2 = N - za2, Qa = Math.PI * R;
                  xa2 /= na2;
                  0 > xa2 && (xa2 = 0);
                  1 < xa2 && (xa2 = 1);
                  var Ma2 = xa2 - 0.5;
                  xa2 = 0.42 - 0.5 * Math.cos(2 * xa2 * Math.PI) + 0.08 * Math.cos(4 * xa2 * Math.PI);
                  M += Fa2[Ia2] = 1e-9 > Math.abs(Ma2) ? Qa / Math.PI : xa2 * Math.sin(na2 * Qa * Ma2) / (Math.PI * na2 * Ma2);
                }
                for (N = 0; N <= na2; N++) ca2.blackfilt[ia2][N] /= M;
              }
              ca2.fill_buffer_resample_init = 1;
            }
            M = ca2.inbuf_old[la2];
            for (R = 0; R < U3; R++) {
              N = R * ca2.resample_ratio;
              ia2 = 0 | Math.floor(N - ca2.itime[la2]);
              if (na2 + ia2 - na2 / 2 >= aa2) break;
              za2 = N - ca2.itime[la2] - (ia2 + na2 % 2 * 0.5);
              za2 = 0 | Math.floor(2 * za2 * sa2 + sa2 + 0.5);
              for (N = Fa2 = 0; N <= na2; ++N) Ia2 = 0 | N + ia2 - na2 / 2, Fa2 += (0 > Ia2 ? M[ra2 + Ia2] : W2[X2 + Ia2]) * ca2.blackfilt[za2][N];
              V2[T2 + R] = Fa2;
            }
            ha.num_used = Math.min(aa2, na2 + ia2 - na2 / 2);
            ca2.itime[la2] += ha.num_used - R * ca2.resample_ratio;
            if (ha.num_used >= ra2) for (N = 0; N < ra2; N++) M[N] = W2[X2 + ha.num_used + N - ra2];
            else {
              V2 = ra2 - ha.num_used;
              for (N = 0; N < V2; ++N) M[N] = M[N + ha.num_used];
              for (ia2 = 0; N < ra2; ++N, ++ia2) M[N] = W2[X2 + ia2];
            }
            J2.n_out = R;
            D2.n_in = G2.num_used;
          }
          else for (D2.n_out = Math.min(A.framesize, E2), D2.n_in = D2.n_out, A = 0; A < D2.n_out; ++A) w2[0][H.mf_size + A] = v2[0][B2 + A], 2 == H.channels_out && (w2[1][H.mf_size + A] = v2[1][B2 + A]);
          w2 = t2.n_in;
          t2 = t2.n_out;
          if (h.findReplayGain && !h.decode_on_the_fly && l.AnalyzeSamples(h.rgdata, y[0], h.mf_size, y[1], h.mf_size, t2, h.channels_out) == Y.GAIN_ANALYSIS_ERROR) return -6;
          p2 -= w2;
          k2 += w2;
          h.mf_size += t2;
          1 > h.mf_samples_to_encode && (h.mf_samples_to_encode = c.ENCDELAY + c.POSTDELAY);
          h.mf_samples_to_encode += t2;
          if (h.mf_size >= g2) {
            w2 = r2 - x;
            0 == r2 && (w2 = 0);
            t2 = f2;
            w2 = e.enc.lame_encode_mp3_frame(t2, y[0], y[1], q2, n2, w2);
            t2.frameNum++;
            t2 = w2;
            if (0 > t2) return t2;
            n2 += t2;
            x += t2;
            h.mf_size -= f2.framesize;
            h.mf_samples_to_encode -= f2.framesize;
            for (w2 = 0; w2 < h.channels_out; w2++) for (t2 = 0; t2 < h.mf_size; t2++) y[w2][t2] = y[w2][t2 + f2.framesize];
          }
        }
        return x;
      }
      function a() {
        this.n_out = this.n_in = 0;
      }
      function m() {
        this.num_used = 0;
      }
      function z(a2, b2) {
        return 0 != b2 ? z(
          b2,
          a2 % b2
        ) : a2;
      }
      var e = this;
      W.V9 = 410;
      W.V8 = 420;
      W.V7 = 430;
      W.V6 = 440;
      W.V5 = 450;
      W.V4 = 460;
      W.V3 = 470;
      W.V2 = 480;
      W.V1 = 490;
      W.V0 = 500;
      W.R3MIX = 1e3;
      W.STANDARD = 1001;
      W.EXTREME = 1002;
      W.INSANE = 1003;
      W.STANDARD_FAST = 1004;
      W.EXTREME_FAST = 1005;
      W.MEDIUM = 1006;
      W.MEDIUM_FAST = 1007;
      W.LAME_MAXMP3BUFFER = 147456;
      var l, d, g, q, D, p = new Pb(), r, t, J;
      this.enc = new c();
      this.setModules = function(a2, b2, c2, f2, e2, k2, m2, n2, u2) {
        l = a2;
        d = b2;
        g = c2;
        q = f2;
        D = e2;
        r = k2;
        t = n2;
        J = u2;
        this.enc.setModules(d, p, q, r);
      };
      this.lame_init = function() {
        var a2 = new zc();
        a2.class_id = 4294479419;
        var b2 = a2.internal_flags = new da();
        a2.mode = la.NOT_SET;
        a2.original = 1;
        a2.in_samplerate = 44100;
        a2.num_channels = 2;
        a2.num_samples = -1;
        a2.bWriteVbrTag = true;
        a2.quality = -1;
        a2.short_blocks = null;
        b2.subblock_gain = -1;
        a2.lowpassfreq = 0;
        a2.highpassfreq = 0;
        a2.lowpasswidth = -1;
        a2.highpasswidth = -1;
        a2.VBR = G.vbr_off;
        a2.VBR_q = 4;
        a2.ATHcurve = -1;
        a2.VBR_mean_bitrate_kbps = 128;
        a2.VBR_min_bitrate_kbps = 0;
        a2.VBR_max_bitrate_kbps = 0;
        a2.VBR_hard_min = 0;
        b2.VBR_min_bitrate = 1;
        b2.VBR_max_bitrate = 13;
        a2.quant_comp = -1;
        a2.quant_comp_short = -1;
        a2.msfix = -1;
        b2.resample_ratio = 1;
        b2.OldValue[0] = 180;
        b2.OldValue[1] = 180;
        b2.CurrentStep[0] = 4;
        b2.CurrentStep[1] = 4;
        b2.masking_lower = 1;
        b2.nsPsy.attackthre = -1;
        b2.nsPsy.attackthre_s = -1;
        a2.scale = -1;
        a2.athaa_type = -1;
        a2.ATHtype = -1;
        a2.athaa_loudapprox = -1;
        a2.athaa_sensitivity = 0;
        a2.useTemporal = null;
        a2.interChRatio = -1;
        b2.mf_samples_to_encode = c.ENCDELAY + c.POSTDELAY;
        a2.encoder_padding = 0;
        b2.mf_size = c.ENCDELAY - c.MDCTDELAY;
        a2.findReplayGain = false;
        a2.decode_on_the_fly = false;
        b2.decode_on_the_fly = false;
        b2.findReplayGain = false;
        b2.findPeakSample = false;
        b2.RadioGain = 0;
        b2.AudiophileGain = 0;
        b2.noclipGainChange = 0;
        b2.noclipScale = -1;
        a2.preset = 0;
        a2.write_id3tag_automatic = true;
        a2.lame_allocated_gfp = 1;
        return a2;
      };
      this.nearestBitrateFullIndex = function(a2) {
        var b2 = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
        var d2 = b2[16];
        var c2 = 16;
        var f2 = b2[16];
        var e2 = 16;
        for (var h = 0; 16 > h; h++) if (Math.max(a2, b2[h + 1]) != a2) {
          d2 = b2[h + 1];
          c2 = h + 1;
          f2 = b2[h];
          e2 = h;
          break;
        }
        return d2 - a2 > a2 - f2 ? e2 : c2;
      };
      this.lame_init_params = function(a2) {
        var b2 = a2.internal_flags;
        b2.Class_ID = 0;
        null == b2.ATH && (b2.ATH = new Cc());
        null == b2.PSY && (b2.PSY = new u());
        null == b2.rgdata && (b2.rgdata = new Ac());
        b2.channels_in = a2.num_channels;
        1 == b2.channels_in && (a2.mode = la.MONO);
        b2.channels_out = a2.mode == la.MONO ? 1 : 2;
        b2.mode_ext = c.MPG_MD_MS_LR;
        a2.mode == la.MONO && (a2.force_ms = false);
        a2.VBR == G.vbr_off && 128 != a2.VBR_mean_bitrate_kbps && 0 == a2.brate && (a2.brate = a2.VBR_mean_bitrate_kbps);
        a2.VBR != G.vbr_off && a2.VBR != G.vbr_mtrh && a2.VBR != G.vbr_mt && (a2.free_format = false);
        a2.VBR == G.vbr_off && 0 == a2.brate && qa.EQ(a2.compression_ratio, 0) && (a2.compression_ratio = 11.025);
        a2.VBR == G.vbr_off && 0 < a2.compression_ratio && (0 == a2.out_samplerate && (a2.out_samplerate = map2MP3Frequency(int(0.97 * a2.in_samplerate))), a2.brate = 0 | 16 * a2.out_samplerate * b2.channels_out / (1e3 * a2.compression_ratio), b2.samplerate_index = E(a2.out_samplerate, a2), a2.free_format || (a2.brate = B(a2.brate, a2.version, a2.out_samplerate)));
        0 != a2.out_samplerate && (16e3 > a2.out_samplerate ? (a2.VBR_mean_bitrate_kbps = Math.max(a2.VBR_mean_bitrate_kbps, 8), a2.VBR_mean_bitrate_kbps = Math.min(a2.VBR_mean_bitrate_kbps, 64)) : 32e3 > a2.out_samplerate ? (a2.VBR_mean_bitrate_kbps = Math.max(a2.VBR_mean_bitrate_kbps, 8), a2.VBR_mean_bitrate_kbps = Math.min(a2.VBR_mean_bitrate_kbps, 160)) : (a2.VBR_mean_bitrate_kbps = Math.max(a2.VBR_mean_bitrate_kbps, 32), a2.VBR_mean_bitrate_kbps = Math.min(a2.VBR_mean_bitrate_kbps, 320)));
        if (0 == a2.lowpassfreq) {
          switch (a2.VBR) {
            case G.vbr_off:
              var e2 = new k();
              f(e2, a2.brate);
              e2 = e2.lowerlimit;
              break;
            case G.vbr_abr:
              e2 = new k();
              f(e2, a2.VBR_mean_bitrate_kbps);
              e2 = e2.lowerlimit;
              break;
            case G.vbr_rh:
              var h = [19500, 19e3, 18600, 18e3, 17500, 16e3, 15600, 14900, 12500, 1e4, 3950];
              if (0 <= a2.VBR_q && 9 >= a2.VBR_q) {
                e2 = h[a2.VBR_q];
                h = h[a2.VBR_q + 1];
                var m2 = a2.VBR_q_frac;
                e2 = linear_int(e2, h, m2);
              } else e2 = 19500;
              break;
            default:
              h = [
                19500,
                19e3,
                18500,
                18e3,
                17500,
                16500,
                15500,
                14500,
                12500,
                9500,
                3950
              ], 0 <= a2.VBR_q && 9 >= a2.VBR_q ? (e2 = h[a2.VBR_q], h = h[a2.VBR_q + 1], m2 = a2.VBR_q_frac, e2 = linear_int(e2, h, m2)) : e2 = 19500;
          }
          a2.mode != la.MONO || a2.VBR != G.vbr_off && a2.VBR != G.vbr_abr || (e2 *= 1.5);
          a2.lowpassfreq = e2 | 0;
        }
        0 == a2.out_samplerate && (2 * a2.lowpassfreq > a2.in_samplerate && (a2.lowpassfreq = a2.in_samplerate / 2), e2 = a2.lowpassfreq | 0, h = a2.in_samplerate, m2 = 44100, 48e3 <= h ? m2 = 48e3 : 44100 <= h ? m2 = 44100 : 32e3 <= h ? m2 = 32e3 : 24e3 <= h ? m2 = 24e3 : 22050 <= h ? m2 = 22050 : 16e3 <= h ? m2 = 16e3 : 12e3 <= h ? m2 = 12e3 : 11025 <= h ? m2 = 11025 : 8e3 <= h && (m2 = 8e3), -1 == e2 ? e2 = m2 : (15960 >= e2 && (m2 = 44100), 15250 >= e2 && (m2 = 32e3), 11220 >= e2 && (m2 = 24e3), 9970 >= e2 && (m2 = 22050), 7230 >= e2 && (m2 = 16e3), 5420 >= e2 && (m2 = 12e3), 4510 >= e2 && (m2 = 11025), 3970 >= e2 && (m2 = 8e3), e2 = h < m2 ? 44100 < h ? 48e3 : 32e3 < h ? 44100 : 24e3 < h ? 32e3 : 22050 < h ? 24e3 : 16e3 < h ? 22050 : 12e3 < h ? 16e3 : 11025 < h ? 12e3 : 8e3 < h ? 11025 : 8e3 : m2), a2.out_samplerate = e2);
        a2.lowpassfreq = Math.min(20500, a2.lowpassfreq);
        a2.lowpassfreq = Math.min(a2.out_samplerate / 2, a2.lowpassfreq);
        a2.VBR == G.vbr_off && (a2.compression_ratio = 16 * a2.out_samplerate * b2.channels_out / (1e3 * a2.brate));
        a2.VBR == G.vbr_abr && (a2.compression_ratio = 16 * a2.out_samplerate * b2.channels_out / (1e3 * a2.VBR_mean_bitrate_kbps));
        a2.bWriteVbrTag || (a2.findReplayGain = false, a2.decode_on_the_fly = false, b2.findPeakSample = false);
        b2.findReplayGain = a2.findReplayGain;
        b2.decode_on_the_fly = a2.decode_on_the_fly;
        b2.decode_on_the_fly && (b2.findPeakSample = true);
        if (b2.findReplayGain && l.InitGainAnalysis(b2.rgdata, a2.out_samplerate) == Y.INIT_GAIN_ANALYSIS_ERROR) return a2.internal_flags = null, -6;
        b2.decode_on_the_fly && !a2.decode_only && (null != b2.hip && J.hip_decode_exit(b2.hip), b2.hip = J.hip_decode_init());
        b2.mode_gr = 24e3 >= a2.out_samplerate ? 1 : 2;
        a2.framesize = 576 * b2.mode_gr;
        a2.encoder_delay = c.ENCDELAY;
        b2.resample_ratio = a2.in_samplerate / a2.out_samplerate;
        switch (a2.VBR) {
          case G.vbr_mt:
          case G.vbr_rh:
          case G.vbr_mtrh:
            a2.compression_ratio = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14, 15, 16.5][a2.VBR_q];
            break;
          case G.vbr_abr:
            a2.compression_ratio = 16 * a2.out_samplerate * b2.channels_out / (1e3 * a2.VBR_mean_bitrate_kbps);
            break;
          default:
            a2.compression_ratio = 16 * a2.out_samplerate * b2.channels_out / (1e3 * a2.brate);
        }
        a2.mode == la.NOT_SET && (a2.mode = la.JOINT_STEREO);
        0 < a2.highpassfreq ? (b2.highpass1 = 2 * a2.highpassfreq, b2.highpass2 = 0 <= a2.highpasswidth ? 2 * (a2.highpassfreq + a2.highpasswidth) : 2 * a2.highpassfreq, b2.highpass1 /= a2.out_samplerate, b2.highpass2 /= a2.out_samplerate) : (b2.highpass1 = 0, b2.highpass2 = 0);
        0 < a2.lowpassfreq ? (b2.lowpass2 = 2 * a2.lowpassfreq, 0 <= a2.lowpasswidth ? (b2.lowpass1 = 2 * (a2.lowpassfreq - a2.lowpasswidth), 0 > b2.lowpass1 && (b2.lowpass1 = 0)) : b2.lowpass1 = 2 * a2.lowpassfreq, b2.lowpass1 /= a2.out_samplerate, b2.lowpass2 /= a2.out_samplerate) : (b2.lowpass1 = 0, b2.lowpass2 = 0);
        e2 = a2.internal_flags;
        var n2 = 32, v2 = -1;
        if (0 < e2.lowpass1) {
          var z2 = 999;
          for (h = 0; 31 >= h; h++) m2 = h / 31, m2 >= e2.lowpass2 && (n2 = Math.min(n2, h)), e2.lowpass1 < m2 && m2 < e2.lowpass2 && (z2 = Math.min(z2, h));
          e2.lowpass1 = 999 == z2 ? (n2 - 0.75) / 31 : (z2 - 0.75) / 31;
          e2.lowpass2 = n2 / 31;
        }
        0 < e2.highpass2 && e2.highpass2 < 0.75 / 31 * 0.9 && (e2.highpass1 = 0, e2.highpass2 = 0, T.err.println("Warning: highpass filter disabled.  highpass frequency too small\n"));
        if (0 < e2.highpass2) {
          n2 = -1;
          for (h = 0; 31 >= h; h++) m2 = h / 31, m2 <= e2.highpass1 && (v2 = Math.max(v2, h)), e2.highpass1 < m2 && m2 < e2.highpass2 && (n2 = Math.max(n2, h));
          e2.highpass1 = v2 / 31;
          e2.highpass2 = -1 == n2 ? (v2 + 0.75) / 31 : (n2 + 0.75) / 31;
        }
        for (h = 0; 32 > h; h++) m2 = h / 31, v2 = e2.highpass2 > e2.highpass1 ? V((e2.highpass2 - m2) / (e2.highpass2 - e2.highpass1 + 1e-20)) : 1, m2 = e2.lowpass2 > e2.lowpass1 ? V((m2 - e2.lowpass1) / (e2.lowpass2 - e2.lowpass1 + 1e-20)) : 1, e2.amp_filter[h] = v2 * m2;
        b2.samplerate_index = E(a2.out_samplerate, a2);
        if (0 > b2.samplerate_index) return a2.internal_flags = null, -1;
        if (a2.VBR == G.vbr_off) if (a2.free_format) b2.bitrate_index = 0;
        else {
          if (a2.brate = B(a2.brate, a2.version, a2.out_samplerate), b2.bitrate_index = U2(a2.brate, a2.version, a2.out_samplerate), 0 >= b2.bitrate_index) return a2.internal_flags = null, -1;
        }
        else b2.bitrate_index = 1;
        a2.analysis && (a2.bWriteVbrTag = false);
        null != b2.pinfo && (a2.bWriteVbrTag = false);
        d.init_bit_stream_w(b2);
        e2 = b2.samplerate_index + 3 * a2.version + 6 * (16e3 > a2.out_samplerate ? 1 : 0);
        for (h = 0; h < c.SBMAX_l + 1; h++) b2.scalefac_band.l[h] = q.sfBandIndex[e2].l[h];
        for (h = 0; h < c.PSFB21 + 1; h++) m2 = (b2.scalefac_band.l[22] - b2.scalefac_band.l[21]) / c.PSFB21, m2 = b2.scalefac_band.l[21] + h * m2, b2.scalefac_band.psfb21[h] = m2;
        b2.scalefac_band.psfb21[c.PSFB21] = 576;
        for (h = 0; h < c.SBMAX_s + 1; h++) b2.scalefac_band.s[h] = q.sfBandIndex[e2].s[h];
        for (h = 0; h < c.PSFB12 + 1; h++) m2 = (b2.scalefac_band.s[13] - b2.scalefac_band.s[12]) / c.PSFB12, m2 = b2.scalefac_band.s[12] + h * m2, b2.scalefac_band.psfb12[h] = m2;
        b2.scalefac_band.psfb12[c.PSFB12] = 192;
        b2.sideinfo_len = 1 == a2.version ? 1 == b2.channels_out ? 21 : 36 : 1 == b2.channels_out ? 13 : 21;
        a2.error_protection && (b2.sideinfo_len += 2);
        e2 = a2.internal_flags;
        a2.frameNum = 0;
        a2.write_id3tag_automatic && t.id3tag_write_v2(a2);
        e2.bitrate_stereoMode_Hist = Ia([16, 5]);
        e2.bitrate_blockType_Hist = Ia([16, 6]);
        e2.PeakSample = 0;
        a2.bWriteVbrTag && r.InitVbrTag(a2);
        b2.Class_ID = 4294479419;
        for (e2 = 0; 19 > e2; e2++) b2.nsPsy.pefirbuf[e2] = 700 * b2.mode_gr * b2.channels_out;
        -1 == a2.ATHtype && (a2.ATHtype = 4);
        switch (a2.VBR) {
          case G.vbr_mt:
            a2.VBR = G.vbr_mtrh;
          case G.vbr_mtrh:
            null == a2.useTemporal && (a2.useTemporal = false);
            g.apply_preset(a2, 500 - 10 * a2.VBR_q, 0);
            0 > a2.quality && (a2.quality = LAME_DEFAULT_QUALITY);
            5 > a2.quality && (a2.quality = 0);
            5 < a2.quality && (a2.quality = 5);
            b2.PSY.mask_adjust = a2.maskingadjust;
            b2.PSY.mask_adjust_short = a2.maskingadjust_short;
            b2.sfb21_extra = a2.experimentalY ? false : 44e3 < a2.out_samplerate;
            b2.iteration_loop = new VBRNewIterationLoop(D);
            break;
          case G.vbr_rh:
            g.apply_preset(
              a2,
              500 - 10 * a2.VBR_q,
              0
            );
            b2.PSY.mask_adjust = a2.maskingadjust;
            b2.PSY.mask_adjust_short = a2.maskingadjust_short;
            b2.sfb21_extra = a2.experimentalY ? false : 44e3 < a2.out_samplerate;
            6 < a2.quality && (a2.quality = 6);
            0 > a2.quality && (a2.quality = LAME_DEFAULT_QUALITY);
            b2.iteration_loop = new VBROldIterationLoop(D);
            break;
          default:
            b2.sfb21_extra = false, 0 > a2.quality && (a2.quality = LAME_DEFAULT_QUALITY), e2 = a2.VBR, e2 == G.vbr_off && (a2.VBR_mean_bitrate_kbps = a2.brate), g.apply_preset(a2, a2.VBR_mean_bitrate_kbps, 0), a2.VBR = e2, b2.PSY.mask_adjust = a2.maskingadjust, b2.PSY.mask_adjust_short = a2.maskingadjust_short, b2.iteration_loop = e2 == G.vbr_off ? new Bc(D) : new ABRIterationLoop(D);
        }
        if (a2.VBR != G.vbr_off) {
          b2.VBR_min_bitrate = 1;
          b2.VBR_max_bitrate = 14;
          16e3 > a2.out_samplerate && (b2.VBR_max_bitrate = 8);
          if (0 != a2.VBR_min_bitrate_kbps && (a2.VBR_min_bitrate_kbps = B(a2.VBR_min_bitrate_kbps, a2.version, a2.out_samplerate), b2.VBR_min_bitrate = U2(a2.VBR_min_bitrate_kbps, a2.version, a2.out_samplerate), 0 > b2.VBR_min_bitrate) || 0 != a2.VBR_max_bitrate_kbps && (a2.VBR_max_bitrate_kbps = B(a2.VBR_max_bitrate_kbps, a2.version, a2.out_samplerate), b2.VBR_max_bitrate = U2(a2.VBR_max_bitrate_kbps, a2.version, a2.out_samplerate), 0 > b2.VBR_max_bitrate)) return -1;
          a2.VBR_min_bitrate_kbps = w.bitrate_table[a2.version][b2.VBR_min_bitrate];
          a2.VBR_max_bitrate_kbps = w.bitrate_table[a2.version][b2.VBR_max_bitrate];
          a2.VBR_mean_bitrate_kbps = Math.min(w.bitrate_table[a2.version][b2.VBR_max_bitrate], a2.VBR_mean_bitrate_kbps);
          a2.VBR_mean_bitrate_kbps = Math.max(w.bitrate_table[a2.version][b2.VBR_min_bitrate], a2.VBR_mean_bitrate_kbps);
        }
        a2.tune && (b2.PSY.mask_adjust += a2.tune_value_a, b2.PSY.mask_adjust_short += a2.tune_value_a);
        e2 = a2.internal_flags;
        switch (a2.quality) {
          default:
          case 9:
            e2.psymodel = 0;
            e2.noise_shaping = 0;
            e2.noise_shaping_amp = 0;
            e2.noise_shaping_stop = 0;
            e2.use_best_huffman = 0;
            e2.full_outer_loop = 0;
            break;
          case 8:
            a2.quality = 7;
          case 7:
            e2.psymodel = 1;
            e2.noise_shaping = 0;
            e2.noise_shaping_amp = 0;
            e2.noise_shaping_stop = 0;
            e2.use_best_huffman = 0;
            e2.full_outer_loop = 0;
            break;
          case 6:
            e2.psymodel = 1;
            0 == e2.noise_shaping && (e2.noise_shaping = 1);
            e2.noise_shaping_amp = 0;
            e2.noise_shaping_stop = 0;
            -1 == e2.subblock_gain && (e2.subblock_gain = 1);
            e2.use_best_huffman = 0;
            e2.full_outer_loop = 0;
            break;
          case 5:
            e2.psymodel = 1;
            0 == e2.noise_shaping && (e2.noise_shaping = 1);
            e2.noise_shaping_amp = 0;
            e2.noise_shaping_stop = 0;
            -1 == e2.subblock_gain && (e2.subblock_gain = 1);
            e2.use_best_huffman = 0;
            e2.full_outer_loop = 0;
            break;
          case 4:
            e2.psymodel = 1;
            0 == e2.noise_shaping && (e2.noise_shaping = 1);
            e2.noise_shaping_amp = 0;
            e2.noise_shaping_stop = 0;
            -1 == e2.subblock_gain && (e2.subblock_gain = 1);
            e2.use_best_huffman = 1;
            e2.full_outer_loop = 0;
            break;
          case 3:
            e2.psymodel = 1;
            0 == e2.noise_shaping && (e2.noise_shaping = 1);
            e2.noise_shaping_amp = 1;
            e2.noise_shaping_stop = 1;
            -1 == e2.subblock_gain && (e2.subblock_gain = 1);
            e2.use_best_huffman = 1;
            e2.full_outer_loop = 0;
            break;
          case 2:
            e2.psymodel = 1;
            0 == e2.noise_shaping && (e2.noise_shaping = 1);
            0 == e2.substep_shaping && (e2.substep_shaping = 2);
            e2.noise_shaping_amp = 1;
            e2.noise_shaping_stop = 1;
            -1 == e2.subblock_gain && (e2.subblock_gain = 1);
            e2.use_best_huffman = 1;
            e2.full_outer_loop = 0;
            break;
          case 1:
            e2.psymodel = 1;
            0 == e2.noise_shaping && (e2.noise_shaping = 1);
            0 == e2.substep_shaping && (e2.substep_shaping = 2);
            e2.noise_shaping_amp = 2;
            e2.noise_shaping_stop = 1;
            -1 == e2.subblock_gain && (e2.subblock_gain = 1);
            e2.use_best_huffman = 1;
            e2.full_outer_loop = 0;
            break;
          case 0:
            e2.psymodel = 1, 0 == e2.noise_shaping && (e2.noise_shaping = 1), 0 == e2.substep_shaping && (e2.substep_shaping = 2), e2.noise_shaping_amp = 2, e2.noise_shaping_stop = 1, -1 == e2.subblock_gain && (e2.subblock_gain = 1), e2.use_best_huffman = 1, e2.full_outer_loop = 0;
        }
        b2.ATH.useAdjust = 0 > a2.athaa_type ? 3 : a2.athaa_type;
        b2.ATH.aaSensitivityP = Math.pow(10, a2.athaa_sensitivity / -10);
        null == a2.short_blocks && (a2.short_blocks = ra.short_block_allowed);
        a2.short_blocks != ra.short_block_allowed || a2.mode != la.JOINT_STEREO && a2.mode != la.STEREO || (a2.short_blocks = ra.short_block_coupled);
        0 > a2.quant_comp && (a2.quant_comp = 1);
        0 > a2.quant_comp_short && (a2.quant_comp_short = 0);
        0 > a2.msfix && (a2.msfix = 0);
        a2.exp_nspsytune |= 1;
        0 > a2.internal_flags.nsPsy.attackthre && (a2.internal_flags.nsPsy.attackthre = Pb.NSATTACKTHRE);
        0 > a2.internal_flags.nsPsy.attackthre_s && (a2.internal_flags.nsPsy.attackthre_s = Pb.NSATTACKTHRE_S);
        0 > a2.scale && (a2.scale = 1);
        0 > a2.ATHtype && (a2.ATHtype = 4);
        0 > a2.ATHcurve && (a2.ATHcurve = 4);
        0 > a2.athaa_loudapprox && (a2.athaa_loudapprox = 2);
        0 > a2.interChRatio && (a2.interChRatio = 0);
        null == a2.useTemporal && (a2.useTemporal = true);
        b2.slot_lag = b2.frac_SpF = 0;
        a2.VBR == G.vbr_off && (b2.slot_lag = b2.frac_SpF = 72e3 * (a2.version + 1) * a2.brate % a2.out_samplerate | 0);
        q.iteration_init(a2);
        p.psymodel_init(a2);
        return 0;
      };
      this.lame_encode_flush = function(a2, e2, f2, g2) {
        var k2 = a2.internal_flags, l2 = dc([2, 1152]), h = 0, m2 = k2.mf_samples_to_encode - c.POSTDELAY, p2 = b(a2);
        if (1 > k2.mf_samples_to_encode) return 0;
        var n2 = 0;
        a2.in_samplerate != a2.out_samplerate && (m2 += 16 * a2.out_samplerate / a2.in_samplerate);
        var q2 = a2.framesize - m2 % a2.framesize;
        576 > q2 && (q2 += a2.framesize);
        a2.encoder_padding = q2;
        for (q2 = (m2 + q2) / a2.framesize; 0 < q2 && 0 <= h; ) {
          var r2 = p2 - k2.mf_size;
          m2 = a2.frameNum;
          r2 *= a2.in_samplerate;
          r2 /= a2.out_samplerate;
          1152 < r2 && (r2 = 1152);
          1 > r2 && (r2 = 1);
          h = g2 - n2;
          0 == g2 && (h = 0);
          h = this.lame_encode_buffer(a2, l2[0], l2[1], r2, e2, f2, h);
          f2 += h;
          n2 += h;
          q2 -= m2 != a2.frameNum ? 1 : 0;
        }
        k2.mf_samples_to_encode = 0;
        if (0 > h) return h;
        h = g2 - n2;
        0 == g2 && (h = 0);
        d.flush_bitstream(a2);
        h = d.copy_buffer(k2, e2, f2, h, 1);
        if (0 > h) return h;
        f2 += h;
        n2 += h;
        h = g2 - n2;
        0 == g2 && (h = 0);
        if (a2.write_id3tag_automatic) {
          t.id3tag_write_v1(a2);
          h = d.copy_buffer(k2, e2, f2, h, 0);
          if (0 > h) return h;
          n2 += h;
        }
        return n2;
      };
      this.lame_encode_buffer = function(a2, b2, d2, c2, e2, f2, g2) {
        var h = a2.internal_flags, k2 = [null, null];
        if (4294479419 != h.Class_ID) return -3;
        if (0 == c2) return 0;
        if (null == h.in_buffer_0 || h.in_buffer_nsamples < c2) h.in_buffer_0 = K(c2), h.in_buffer_1 = K(c2), h.in_buffer_nsamples = c2;
        k2[0] = h.in_buffer_0;
        k2[1] = h.in_buffer_1;
        for (var l2 = 0; l2 < c2; l2++) k2[0][l2] = b2[l2], 1 < h.channels_in && (k2[1][l2] = d2[l2]);
        return v(a2, k2[0], k2[1], c2, e2, f2, g2);
      };
    }
    function Kc() {
      this.setModules = function(c2, k) {
      };
    }
    function Lc() {
      this.setModules = function(c2, k, n) {
      };
    }
    function Mc() {
    }
    function Nc() {
      this.setModules = function(c2, k) {
      };
    }
    function Fa() {
      this.sampleRate = this.channels = this.dataLen = this.dataOffset = 0;
    }
    function cc(c2) {
      return c2.charCodeAt(0) << 24 | c2.charCodeAt(1) << 16 | c2.charCodeAt(2) << 8 | c2.charCodeAt(3);
    }
    var na = { fill: function(c2, k, n, w2) {
      if (2 == arguments.length) for (var u = 0; u < c2.length; u++) c2[u] = arguments[1];
      else for (u = k; u < n; u++) c2[u] = w2;
    } }, T = { arraycopy: function(c2, k, n, w2, E) {
      for (E = k + E; k < E; ) n[w2++] = c2[k++];
    } }, aa = { SQRT2: 1.4142135623730951, FAST_LOG10: function(c2) {
      return Math.log10(c2);
    }, FAST_LOG10_X: function(c2, k) {
      return Math.log10(c2) * k;
    } };
    ra.short_block_allowed = new ra(0);
    ra.short_block_coupled = new ra(1);
    ra.short_block_dispensed = new ra(2);
    ra.short_block_forced = new ra(3);
    var Ma = { MAX_VALUE: 34028235e31 };
    G.vbr_off = new G(0);
    G.vbr_mt = new G(1);
    G.vbr_rh = new G(2);
    G.vbr_abr = new G(3);
    G.vbr_mtrh = new G(4);
    G.vbr_default = G.vbr_mtrh;
    la.STEREO = new la(0);
    la.JOINT_STEREO = new la(1);
    la.DUAL_CHANNEL = new la(2);
    la.MONO = new la(3);
    la.NOT_SET = new la(4);
    Y.STEPS_per_dB = 100;
    Y.MAX_dB = 120;
    Y.GAIN_NOT_ENOUGH_SAMPLES = -24601;
    Y.GAIN_ANALYSIS_ERROR = 0;
    Y.GAIN_ANALYSIS_OK = 1;
    Y.INIT_GAIN_ANALYSIS_ERROR = 0;
    Y.INIT_GAIN_ANALYSIS_OK = 1;
    Y.YULE_ORDER = 10;
    Y.MAX_ORDER = Y.YULE_ORDER;
    Y.MAX_SAMP_FREQ = 48e3;
    Y.RMS_WINDOW_TIME_NUMERATOR = 1;
    Y.RMS_WINDOW_TIME_DENOMINATOR = 20;
    Y.MAX_SAMPLES_PER_WINDOW = Y.MAX_SAMP_FREQ * Y.RMS_WINDOW_TIME_NUMERATOR / Y.RMS_WINDOW_TIME_DENOMINATOR + 1;
    qa.EQ = function(c2, k) {
      return Math.abs(c2) > Math.abs(k) ? Math.abs(c2 - k) <= 1e-6 * Math.abs(c2) : Math.abs(c2 - k) <= 1e-6 * Math.abs(k);
    };
    qa.NEQ = function(c2, k) {
      return !qa.EQ(c2, k);
    };
    zb.NUMTOCENTRIES = 100;
    zb.MAXFRAMESIZE = 2880;
    var w = { t1HB: [1, 1, 1, 0], t2HB: [1, 2, 1, 3, 1, 1, 3, 2, 0], t3HB: [3, 2, 1, 1, 1, 1, 3, 2, 0], t5HB: [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0], t6HB: [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0], t7HB: [1, 2, 10, 19, 16, 10, 3, 3, 7, 10, 5, 3, 11, 4, 13, 17, 8, 4, 12, 11, 18, 15, 11, 2, 7, 6, 9, 14, 3, 1, 6, 4, 5, 3, 2, 0], t8HB: [3, 4, 6, 18, 12, 5, 5, 1, 2, 16, 9, 3, 7, 3, 5, 14, 7, 3, 19, 17, 15, 13, 10, 4, 13, 5, 8, 11, 5, 1, 12, 4, 4, 1, 1, 0], t9HB: [7, 5, 9, 14, 15, 7, 6, 4, 5, 5, 6, 7, 7, 6, 8, 8, 8, 5, 15, 6, 9, 10, 5, 1, 11, 7, 9, 6, 4, 1, 14, 4, 6, 2, 6, 0], t10HB: [
      1,
      2,
      10,
      23,
      35,
      30,
      12,
      17,
      3,
      3,
      8,
      12,
      18,
      21,
      12,
      7,
      11,
      9,
      15,
      21,
      32,
      40,
      19,
      6,
      14,
      13,
      22,
      34,
      46,
      23,
      18,
      7,
      20,
      19,
      33,
      47,
      27,
      22,
      9,
      3,
      31,
      22,
      41,
      26,
      21,
      20,
      5,
      3,
      14,
      13,
      10,
      11,
      16,
      6,
      5,
      1,
      9,
      8,
      7,
      8,
      4,
      4,
      2,
      0
    ], t11HB: [3, 4, 10, 24, 34, 33, 21, 15, 5, 3, 4, 10, 32, 17, 11, 10, 11, 7, 13, 18, 30, 31, 20, 5, 25, 11, 19, 59, 27, 18, 12, 5, 35, 33, 31, 58, 30, 16, 7, 5, 28, 26, 32, 19, 17, 15, 8, 14, 14, 12, 9, 13, 14, 9, 4, 1, 11, 4, 6, 6, 6, 3, 2, 0], t12HB: [9, 6, 16, 33, 41, 39, 38, 26, 7, 5, 6, 9, 23, 16, 26, 11, 17, 7, 11, 14, 21, 30, 10, 7, 17, 10, 15, 12, 18, 28, 14, 5, 32, 13, 22, 19, 18, 16, 9, 5, 40, 17, 31, 29, 17, 13, 4, 2, 27, 12, 11, 15, 10, 7, 4, 1, 27, 12, 8, 12, 6, 3, 1, 0], t13HB: [
      1,
      5,
      14,
      21,
      34,
      51,
      46,
      71,
      42,
      52,
      68,
      52,
      67,
      44,
      43,
      19,
      3,
      4,
      12,
      19,
      31,
      26,
      44,
      33,
      31,
      24,
      32,
      24,
      31,
      35,
      22,
      14,
      15,
      13,
      23,
      36,
      59,
      49,
      77,
      65,
      29,
      40,
      30,
      40,
      27,
      33,
      42,
      16,
      22,
      20,
      37,
      61,
      56,
      79,
      73,
      64,
      43,
      76,
      56,
      37,
      26,
      31,
      25,
      14,
      35,
      16,
      60,
      57,
      97,
      75,
      114,
      91,
      54,
      73,
      55,
      41,
      48,
      53,
      23,
      24,
      58,
      27,
      50,
      96,
      76,
      70,
      93,
      84,
      77,
      58,
      79,
      29,
      74,
      49,
      41,
      17,
      47,
      45,
      78,
      74,
      115,
      94,
      90,
      79,
      69,
      83,
      71,
      50,
      59,
      38,
      36,
      15,
      72,
      34,
      56,
      95,
      92,
      85,
      91,
      90,
      86,
      73,
      77,
      65,
      51,
      44,
      43,
      42,
      43,
      20,
      30,
      44,
      55,
      78,
      72,
      87,
      78,
      61,
      46,
      54,
      37,
      30,
      20,
      16,
      53,
      25,
      41,
      37,
      44,
      59,
      54,
      81,
      66,
      76,
      57,
      54,
      37,
      18,
      39,
      11,
      35,
      33,
      31,
      57,
      42,
      82,
      72,
      80,
      47,
      58,
      55,
      21,
      22,
      26,
      38,
      22,
      53,
      25,
      23,
      38,
      70,
      60,
      51,
      36,
      55,
      26,
      34,
      23,
      27,
      14,
      9,
      7,
      34,
      32,
      28,
      39,
      49,
      75,
      30,
      52,
      48,
      40,
      52,
      28,
      18,
      17,
      9,
      5,
      45,
      21,
      34,
      64,
      56,
      50,
      49,
      45,
      31,
      19,
      12,
      15,
      10,
      7,
      6,
      3,
      48,
      23,
      20,
      39,
      36,
      35,
      53,
      21,
      16,
      23,
      13,
      10,
      6,
      1,
      4,
      2,
      16,
      15,
      17,
      27,
      25,
      20,
      29,
      11,
      17,
      12,
      16,
      8,
      1,
      1,
      0,
      1
    ], t15HB: [
      7,
      12,
      18,
      53,
      47,
      76,
      124,
      108,
      89,
      123,
      108,
      119,
      107,
      81,
      122,
      63,
      13,
      5,
      16,
      27,
      46,
      36,
      61,
      51,
      42,
      70,
      52,
      83,
      65,
      41,
      59,
      36,
      19,
      17,
      15,
      24,
      41,
      34,
      59,
      48,
      40,
      64,
      50,
      78,
      62,
      80,
      56,
      33,
      29,
      28,
      25,
      43,
      39,
      63,
      55,
      93,
      76,
      59,
      93,
      72,
      54,
      75,
      50,
      29,
      52,
      22,
      42,
      40,
      67,
      57,
      95,
      79,
      72,
      57,
      89,
      69,
      49,
      66,
      46,
      27,
      77,
      37,
      35,
      66,
      58,
      52,
      91,
      74,
      62,
      48,
      79,
      63,
      90,
      62,
      40,
      38,
      125,
      32,
      60,
      56,
      50,
      92,
      78,
      65,
      55,
      87,
      71,
      51,
      73,
      51,
      70,
      30,
      109,
      53,
      49,
      94,
      88,
      75,
      66,
      122,
      91,
      73,
      56,
      42,
      64,
      44,
      21,
      25,
      90,
      43,
      41,
      77,
      73,
      63,
      56,
      92,
      77,
      66,
      47,
      67,
      48,
      53,
      36,
      20,
      71,
      34,
      67,
      60,
      58,
      49,
      88,
      76,
      67,
      106,
      71,
      54,
      38,
      39,
      23,
      15,
      109,
      53,
      51,
      47,
      90,
      82,
      58,
      57,
      48,
      72,
      57,
      41,
      23,
      27,
      62,
      9,
      86,
      42,
      40,
      37,
      70,
      64,
      52,
      43,
      70,
      55,
      42,
      25,
      29,
      18,
      11,
      11,
      118,
      68,
      30,
      55,
      50,
      46,
      74,
      65,
      49,
      39,
      24,
      16,
      22,
      13,
      14,
      7,
      91,
      44,
      39,
      38,
      34,
      63,
      52,
      45,
      31,
      52,
      28,
      19,
      14,
      8,
      9,
      3,
      123,
      60,
      58,
      53,
      47,
      43,
      32,
      22,
      37,
      24,
      17,
      12,
      15,
      10,
      2,
      1,
      71,
      37,
      34,
      30,
      28,
      20,
      17,
      26,
      21,
      16,
      10,
      6,
      8,
      6,
      2,
      0
    ], t16HB: [
      1,
      5,
      14,
      44,
      74,
      63,
      110,
      93,
      172,
      149,
      138,
      242,
      225,
      195,
      376,
      17,
      3,
      4,
      12,
      20,
      35,
      62,
      53,
      47,
      83,
      75,
      68,
      119,
      201,
      107,
      207,
      9,
      15,
      13,
      23,
      38,
      67,
      58,
      103,
      90,
      161,
      72,
      127,
      117,
      110,
      209,
      206,
      16,
      45,
      21,
      39,
      69,
      64,
      114,
      99,
      87,
      158,
      140,
      252,
      212,
      199,
      387,
      365,
      26,
      75,
      36,
      68,
      65,
      115,
      101,
      179,
      164,
      155,
      264,
      246,
      226,
      395,
      382,
      362,
      9,
      66,
      30,
      59,
      56,
      102,
      185,
      173,
      265,
      142,
      253,
      232,
      400,
      388,
      378,
      445,
      16,
      111,
      54,
      52,
      100,
      184,
      178,
      160,
      133,
      257,
      244,
      228,
      217,
      385,
      366,
      715,
      10,
      98,
      48,
      91,
      88,
      165,
      157,
      148,
      261,
      248,
      407,
      397,
      372,
      380,
      889,
      884,
      8,
      85,
      84,
      81,
      159,
      156,
      143,
      260,
      249,
      427,
      401,
      392,
      383,
      727,
      713,
      708,
      7,
      154,
      76,
      73,
      141,
      131,
      256,
      245,
      426,
      406,
      394,
      384,
      735,
      359,
      710,
      352,
      11,
      139,
      129,
      67,
      125,
      247,
      233,
      229,
      219,
      393,
      743,
      737,
      720,
      885,
      882,
      439,
      4,
      243,
      120,
      118,
      115,
      227,
      223,
      396,
      746,
      742,
      736,
      721,
      712,
      706,
      223,
      436,
      6,
      202,
      224,
      222,
      218,
      216,
      389,
      386,
      381,
      364,
      888,
      443,
      707,
      440,
      437,
      1728,
      4,
      747,
      211,
      210,
      208,
      370,
      379,
      734,
      723,
      714,
      1735,
      883,
      877,
      876,
      3459,
      865,
      2,
      377,
      369,
      102,
      187,
      726,
      722,
      358,
      711,
      709,
      866,
      1734,
      871,
      3458,
      870,
      434,
      0,
      12,
      10,
      7,
      11,
      10,
      17,
      11,
      9,
      13,
      12,
      10,
      7,
      5,
      3,
      1,
      3
    ], t24HB: [
      15,
      13,
      46,
      80,
      146,
      262,
      248,
      434,
      426,
      669,
      653,
      649,
      621,
      517,
      1032,
      88,
      14,
      12,
      21,
      38,
      71,
      130,
      122,
      216,
      209,
      198,
      327,
      345,
      319,
      297,
      279,
      42,
      47,
      22,
      41,
      74,
      68,
      128,
      120,
      221,
      207,
      194,
      182,
      340,
      315,
      295,
      541,
      18,
      81,
      39,
      75,
      70,
      134,
      125,
      116,
      220,
      204,
      190,
      178,
      325,
      311,
      293,
      271,
      16,
      147,
      72,
      69,
      135,
      127,
      118,
      112,
      210,
      200,
      188,
      352,
      323,
      306,
      285,
      540,
      14,
      263,
      66,
      129,
      126,
      119,
      114,
      214,
      202,
      192,
      180,
      341,
      317,
      301,
      281,
      262,
      12,
      249,
      123,
      121,
      117,
      113,
      215,
      206,
      195,
      185,
      347,
      330,
      308,
      291,
      272,
      520,
      10,
      435,
      115,
      111,
      109,
      211,
      203,
      196,
      187,
      353,
      332,
      313,
      298,
      283,
      531,
      381,
      17,
      427,
      212,
      208,
      205,
      201,
      193,
      186,
      177,
      169,
      320,
      303,
      286,
      268,
      514,
      377,
      16,
      335,
      199,
      197,
      191,
      189,
      181,
      174,
      333,
      321,
      305,
      289,
      275,
      521,
      379,
      371,
      11,
      668,
      184,
      183,
      179,
      175,
      344,
      331,
      314,
      304,
      290,
      277,
      530,
      383,
      373,
      366,
      10,
      652,
      346,
      171,
      168,
      164,
      318,
      309,
      299,
      287,
      276,
      263,
      513,
      375,
      368,
      362,
      6,
      648,
      322,
      316,
      312,
      307,
      302,
      292,
      284,
      269,
      261,
      512,
      376,
      370,
      364,
      359,
      4,
      620,
      300,
      296,
      294,
      288,
      282,
      273,
      266,
      515,
      380,
      374,
      369,
      365,
      361,
      357,
      2,
      1033,
      280,
      278,
      274,
      267,
      264,
      259,
      382,
      378,
      372,
      367,
      363,
      360,
      358,
      356,
      0,
      43,
      20,
      19,
      17,
      15,
      13,
      11,
      9,
      7,
      6,
      4,
      7,
      5,
      3,
      1,
      3
    ], t32HB: [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16], t33HB: [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0], t1l: [1, 4, 3, 5], t2l: [
      1,
      4,
      7,
      4,
      5,
      7,
      6,
      7,
      8
    ], t3l: [2, 3, 7, 4, 4, 7, 6, 7, 8], t5l: [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10], t6l: [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9], t7l: [1, 4, 7, 9, 9, 10, 4, 6, 8, 9, 9, 10, 7, 7, 9, 10, 10, 11, 8, 9, 10, 11, 11, 11, 8, 9, 10, 11, 11, 12, 9, 10, 11, 12, 12, 12], t8l: [2, 4, 7, 9, 9, 10, 4, 4, 6, 10, 10, 10, 7, 6, 8, 10, 10, 11, 9, 10, 10, 11, 11, 12, 9, 9, 10, 11, 12, 12, 10, 10, 11, 11, 13, 13], t9l: [3, 4, 6, 7, 9, 10, 4, 5, 6, 7, 8, 10, 5, 6, 7, 8, 9, 10, 7, 7, 8, 9, 9, 10, 8, 8, 9, 9, 10, 11, 9, 9, 10, 10, 11, 11], t10l: [
      1,
      4,
      7,
      9,
      10,
      10,
      10,
      11,
      4,
      6,
      8,
      9,
      10,
      11,
      10,
      10,
      7,
      8,
      9,
      10,
      11,
      12,
      11,
      11,
      8,
      9,
      10,
      11,
      12,
      12,
      11,
      12,
      9,
      10,
      11,
      12,
      12,
      12,
      12,
      12,
      10,
      11,
      12,
      12,
      13,
      13,
      12,
      13,
      9,
      10,
      11,
      12,
      12,
      12,
      13,
      13,
      10,
      10,
      11,
      12,
      12,
      13,
      13,
      13
    ], t11l: [2, 4, 6, 8, 9, 10, 9, 10, 4, 5, 6, 8, 10, 10, 9, 10, 6, 7, 8, 9, 10, 11, 10, 10, 8, 8, 9, 11, 10, 12, 10, 11, 9, 10, 10, 11, 11, 12, 11, 12, 9, 10, 11, 12, 12, 13, 12, 13, 9, 9, 9, 10, 11, 12, 12, 12, 9, 9, 10, 11, 12, 12, 12, 12], t12l: [4, 4, 6, 8, 9, 10, 10, 10, 4, 5, 6, 7, 9, 9, 10, 10, 6, 6, 7, 8, 9, 10, 9, 10, 7, 7, 8, 8, 9, 10, 10, 10, 8, 8, 9, 9, 10, 10, 10, 11, 9, 9, 10, 10, 10, 11, 10, 11, 9, 9, 9, 10, 10, 11, 11, 12, 10, 10, 10, 11, 11, 11, 11, 12], t13l: [
      1,
      5,
      7,
      8,
      9,
      10,
      10,
      11,
      10,
      11,
      12,
      12,
      13,
      13,
      14,
      14,
      4,
      6,
      8,
      9,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      13,
      14,
      14,
      14,
      7,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      11,
      12,
      12,
      13,
      13,
      14,
      15,
      15,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      15,
      15,
      9,
      9,
      11,
      11,
      12,
      12,
      13,
      13,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      16,
      10,
      10,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      13,
      15,
      15,
      16,
      16,
      10,
      11,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      16,
      16,
      11,
      11,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      16,
      18,
      18,
      10,
      10,
      11,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      16,
      17,
      17,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      15,
      14,
      15,
      15,
      16,
      16,
      16,
      18,
      17,
      11,
      12,
      12,
      13,
      13,
      14,
      14,
      15,
      14,
      15,
      16,
      15,
      16,
      17,
      18,
      19,
      12,
      12,
      12,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      16,
      17,
      17,
      17,
      18,
      12,
      13,
      13,
      14,
      14,
      15,
      14,
      15,
      16,
      16,
      17,
      17,
      17,
      18,
      18,
      18,
      13,
      13,
      14,
      15,
      15,
      15,
      16,
      16,
      16,
      16,
      16,
      17,
      18,
      17,
      18,
      18,
      14,
      14,
      14,
      15,
      15,
      15,
      17,
      16,
      16,
      19,
      17,
      17,
      17,
      19,
      18,
      18,
      13,
      14,
      15,
      16,
      16,
      16,
      17,
      16,
      17,
      17,
      18,
      18,
      21,
      20,
      21,
      18
    ], t15l: [
      3,
      5,
      6,
      8,
      8,
      9,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      14,
      5,
      5,
      7,
      8,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      6,
      7,
      7,
      8,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      9,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      10,
      9,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      14,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      15,
      14,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      12,
      12,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      14,
      15,
      15,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      14,
      15,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      15
    ], t16_5l: [
      1,
      5,
      7,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      14,
      11,
      4,
      6,
      8,
      9,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      14,
      13,
      14,
      11,
      7,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      13,
      12,
      13,
      13,
      13,
      14,
      14,
      12,
      9,
      9,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      13,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      15,
      12,
      10,
      10,
      11,
      11,
      12,
      13,
      13,
      14,
      13,
      14,
      14,
      15,
      15,
      15,
      16,
      13,
      11,
      11,
      11,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      16,
      13,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      17,
      13,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      16,
      16,
      13,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      15,
      16,
      15,
      14,
      12,
      13,
      12,
      13,
      14,
      14,
      14,
      14,
      15,
      16,
      16,
      16,
      17,
      17,
      16,
      13,
      13,
      13,
      13,
      13,
      14,
      14,
      15,
      16,
      16,
      16,
      16,
      16,
      16,
      15,
      16,
      14,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      16,
      16,
      16,
      16,
      18,
      14,
      15,
      14,
      14,
      14,
      15,
      15,
      16,
      16,
      16,
      18,
      17,
      17,
      17,
      19,
      17,
      14,
      14,
      15,
      13,
      14,
      16,
      16,
      15,
      16,
      16,
      17,
      18,
      17,
      19,
      17,
      16,
      14,
      11,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      14,
      14,
      14,
      12
    ], t16l: [
      1,
      5,
      7,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      14,
      10,
      4,
      6,
      8,
      9,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      14,
      13,
      14,
      10,
      7,
      8,
      9,
      10,
      11,
      11,
      12,
      12,
      13,
      12,
      13,
      13,
      13,
      14,
      14,
      11,
      9,
      9,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      12,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      14,
      15,
      15,
      15,
      11,
      10,
      10,
      11,
      11,
      12,
      13,
      13,
      14,
      13,
      14,
      14,
      15,
      15,
      15,
      16,
      12,
      11,
      11,
      11,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      16,
      12,
      11,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      17,
      12,
      11,
      12,
      12,
      13,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      16,
      16,
      12,
      12,
      12,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      15,
      16,
      15,
      13,
      12,
      13,
      12,
      13,
      14,
      14,
      14,
      14,
      15,
      16,
      16,
      16,
      17,
      17,
      16,
      12,
      13,
      13,
      13,
      13,
      14,
      14,
      15,
      16,
      16,
      16,
      16,
      16,
      16,
      15,
      16,
      13,
      13,
      14,
      14,
      14,
      14,
      15,
      15,
      15,
      15,
      17,
      16,
      16,
      16,
      16,
      18,
      13,
      15,
      14,
      14,
      14,
      15,
      15,
      16,
      16,
      16,
      18,
      17,
      17,
      17,
      19,
      17,
      13,
      14,
      15,
      13,
      14,
      16,
      16,
      15,
      16,
      16,
      17,
      18,
      17,
      19,
      17,
      16,
      13,
      10,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      10
    ], t24l: [
      4,
      5,
      7,
      8,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      10,
      5,
      6,
      7,
      8,
      9,
      10,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      10,
      7,
      7,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      13,
      9,
      8,
      8,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      9,
      9,
      9,
      9,
      10,
      10,
      10,
      10,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      9,
      10,
      9,
      10,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      9,
      10,
      10,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      9,
      11,
      10,
      10,
      10,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      10,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      13,
      13,
      10,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      10,
      12,
      11,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      10,
      12,
      12,
      11,
      11,
      11,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      10,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      10,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      10,
      13,
      12,
      12,
      12,
      12,
      12,
      12,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      13,
      10,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      10,
      10,
      10,
      10,
      6
    ], t32l: [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10], t33l: [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8] };
    w.ht = [
      new U(0, 0, null, null),
      new U(2, 0, w.t1HB, w.t1l),
      new U(3, 0, w.t2HB, w.t2l),
      new U(3, 0, w.t3HB, w.t3l),
      new U(0, 0, null, null),
      new U(4, 0, w.t5HB, w.t5l),
      new U(4, 0, w.t6HB, w.t6l),
      new U(6, 0, w.t7HB, w.t7l),
      new U(6, 0, w.t8HB, w.t8l),
      new U(6, 0, w.t9HB, w.t9l),
      new U(
        8,
        0,
        w.t10HB,
        w.t10l
      ),
      new U(8, 0, w.t11HB, w.t11l),
      new U(8, 0, w.t12HB, w.t12l),
      new U(16, 0, w.t13HB, w.t13l),
      new U(0, 0, null, w.t16_5l),
      new U(16, 0, w.t15HB, w.t15l),
      new U(1, 1, w.t16HB, w.t16l),
      new U(2, 3, w.t16HB, w.t16l),
      new U(3, 7, w.t16HB, w.t16l),
      new U(4, 15, w.t16HB, w.t16l),
      new U(6, 63, w.t16HB, w.t16l),
      new U(8, 255, w.t16HB, w.t16l),
      new U(10, 1023, w.t16HB, w.t16l),
      new U(13, 8191, w.t16HB, w.t16l),
      new U(4, 15, w.t24HB, w.t24l),
      new U(5, 31, w.t24HB, w.t24l),
      new U(6, 63, w.t24HB, w.t24l),
      new U(7, 127, w.t24HB, w.t24l),
      new U(8, 255, w.t24HB, w.t24l),
      new U(9, 511, w.t24HB, w.t24l),
      new U(11, 2047, w.t24HB, w.t24l),
      new U(13, 8191, w.t24HB, w.t24l),
      new U(0, 0, w.t32HB, w.t32l),
      new U(0, 0, w.t33HB, w.t33l)
    ];
    w.largetbl = [
      65540,
      327685,
      458759,
      589832,
      655369,
      655370,
      720906,
      720907,
      786443,
      786444,
      786444,
      851980,
      851980,
      851980,
      917517,
      655370,
      262149,
      393222,
      524295,
      589832,
      655369,
      720906,
      720906,
      720907,
      786443,
      786443,
      786444,
      851980,
      917516,
      851980,
      917516,
      655370,
      458759,
      524295,
      589832,
      655369,
      720905,
      720906,
      786442,
      786443,
      851979,
      786443,
      851979,
      851980,
      851980,
      917516,
      917517,
      720905,
      589832,
      589832,
      655369,
      720905,
      720906,
      786442,
      786442,
      786443,
      851979,
      851979,
      917515,
      917516,
      917516,
      983052,
      983052,
      786441,
      655369,
      655369,
      720905,
      720906,
      786442,
      786442,
      851978,
      851979,
      851979,
      917515,
      917516,
      917516,
      983052,
      983052,
      983053,
      720905,
      655370,
      655369,
      720906,
      720906,
      786442,
      851978,
      851979,
      917515,
      851979,
      917515,
      917516,
      983052,
      983052,
      983052,
      1048588,
      786441,
      720906,
      720906,
      720906,
      786442,
      851978,
      851979,
      851979,
      851979,
      917515,
      917516,
      917516,
      917516,
      983052,
      983052,
      1048589,
      786441,
      720907,
      720906,
      786442,
      786442,
      851979,
      851979,
      851979,
      917515,
      917516,
      983052,
      983052,
      983052,
      983052,
      1114125,
      1114125,
      786442,
      720907,
      786443,
      786443,
      851979,
      851979,
      851979,
      917515,
      917515,
      983051,
      983052,
      983052,
      983052,
      1048588,
      1048589,
      1048589,
      786442,
      786443,
      786443,
      786443,
      851979,
      851979,
      917515,
      917515,
      983052,
      983052,
      983052,
      983052,
      1048588,
      983053,
      1048589,
      983053,
      851978,
      786444,
      851979,
      786443,
      851979,
      917515,
      917516,
      917516,
      917516,
      983052,
      1048588,
      1048588,
      1048589,
      1114125,
      1114125,
      1048589,
      786442,
      851980,
      851980,
      851979,
      851979,
      917515,
      917516,
      983052,
      1048588,
      1048588,
      1048588,
      1048588,
      1048589,
      1048589,
      983053,
      1048589,
      851978,
      851980,
      917516,
      917516,
      917516,
      917516,
      983052,
      983052,
      983052,
      983052,
      1114124,
      1048589,
      1048589,
      1048589,
      1048589,
      1179661,
      851978,
      983052,
      917516,
      917516,
      917516,
      983052,
      983052,
      1048588,
      1048588,
      1048589,
      1179661,
      1114125,
      1114125,
      1114125,
      1245197,
      1114125,
      851978,
      917517,
      983052,
      851980,
      917516,
      1048588,
      1048588,
      983052,
      1048589,
      1048589,
      1114125,
      1179661,
      1114125,
      1245197,
      1114125,
      1048589,
      851978,
      655369,
      655369,
      655369,
      720905,
      720905,
      786441,
      786441,
      786441,
      851977,
      851977,
      851977,
      851978,
      851978,
      851978,
      851978,
      655366
    ];
    w.table23 = [
      65538,
      262147,
      458759,
      262148,
      327684,
      458759,
      393222,
      458759,
      524296
    ];
    w.table56 = [65539, 262148, 458758, 524296, 262148, 327684, 524294, 589831, 458757, 524294, 589831, 655368, 524295, 524295, 589832, 655369];
    w.bitrate_table = [[0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1], [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1], [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1]];
    w.samplerate_table = [[22050, 24e3, 16e3, -1], [44100, 48e3, 32e3, -1], [11025, 12e3, 8e3, -1]];
    w.scfsi_band = [0, 6, 11, 16, 21];
    ia.Q_MAX = 257;
    ia.Q_MAX2 = 116;
    ia.LARGE_BITS = 1e5;
    ia.IXMAX_VAL = 8206;
    var sa = {};
    sa.SFBMAX = 3 * c.SBMAX_s;
    c.ENCDELAY = 576;
    c.POSTDELAY = 1152;
    c.MDCTDELAY = 48;
    c.FFTOFFSET = 224 + c.MDCTDELAY;
    c.DECDELAY = 528;
    c.SBLIMIT = 32;
    c.CBANDS = 64;
    c.SBPSY_l = 21;
    c.SBPSY_s = 12;
    c.SBMAX_l = 22;
    c.SBMAX_s = 13;
    c.PSFB21 = 6;
    c.PSFB12 = 6;
    c.BLKSIZE = 1024;
    c.HBLKSIZE = c.BLKSIZE / 2 + 1;
    c.BLKSIZE_s = 256;
    c.HBLKSIZE_s = c.BLKSIZE_s / 2 + 1;
    c.NORM_TYPE = 0;
    c.START_TYPE = 1;
    c.SHORT_TYPE = 2;
    c.STOP_TYPE = 3;
    c.MPG_MD_LR_LR = 0;
    c.MPG_MD_LR_I = 1;
    c.MPG_MD_MS_LR = 2;
    c.MPG_MD_MS_I = 3;
    c.fircoef = [
      -0.1039435,
      -0.1892065,
      -0.0432472 * 5,
      -0.155915,
      3898045e-23,
      0.0467745 * 5,
      0.50455,
      0.756825,
      0.187098 * 5
    ];
    da.MFSIZE = 3456 + c.ENCDELAY - c.MDCTDELAY;
    da.MAX_HEADER_BUF = 256;
    da.MAX_BITS_PER_CHANNEL = 4095;
    da.MAX_BITS_PER_GRANULE = 7680;
    da.BPC = 320;
    Fa.RIFF = cc("RIFF");
    Fa.WAVE = cc("WAVE");
    Fa.fmt_ = cc("fmt ");
    Fa.data = cc("data");
    Fa.readHeader = function(c2) {
      var k = new Fa(), n = c2.getUint32(0, false);
      if (Fa.RIFF == n && (c2.getUint32(4, true), Fa.WAVE == c2.getUint32(8, false) && Fa.fmt_ == c2.getUint32(12, false))) {
        var u = c2.getUint32(16, true), w2 = 20;
        switch (u) {
          case 16:
          case 18:
            k.channels = c2.getUint16(w2 + 2, true);
            k.sampleRate = c2.getUint32(w2 + 4, true);
            break;
          default:
            throw "extended fmt chunk not implemented";
        }
        w2 += u;
        u = Fa.data;
        for (var B = 0; u != n; ) {
          n = c2.getUint32(w2, false);
          B = c2.getUint32(w2 + 4, true);
          if (u == n) break;
          w2 += B + 8;
        }
        k.dataLen = B;
        k.dataOffset = w2 + 8;
        return k;
      }
    };
    sa.SFBMAX = 3 * c.SBMAX_s;
    lamejs.Mp3Encoder = function(c2, k, n) {
      3 != arguments.length && (console.error("WARN: Mp3Encoder(channels, samplerate, kbps) not specified"), c2 = 1, k = 44100, n = 128);
      var u = new W(), w2 = new Kc(), B = new Y(), G2 = new qa(), f = new wc(), b = new ia(), v = new Ec(), a = new zb(), m = new mc(), z = new Nc(), e = new xc(), l = new qb(), d = new Lc(), g = new Mc();
      u.setModules(B, G2, f, b, v, a, m, z, g);
      G2.setModules(B, g, m, a);
      z.setModules(G2, m);
      f.setModules(u);
      v.setModules(G2, e, b, l);
      b.setModules(l, e, u.enc.psy);
      e.setModules(G2);
      l.setModules(b);
      a.setModules(u, G2, m);
      w2.setModules(d, g);
      d.setModules(m, z, f);
      var q = u.lame_init();
      q.num_channels = c2;
      q.in_samplerate = k;
      q.brate = n;
      q.mode = la.STEREO;
      q.quality = 3;
      q.bWriteVbrTag = false;
      q.disable_reservoir = true;
      q.write_id3tag_automatic = false;
      u.lame_init_params(q);
      var D = 1152, p = 0 | 1.25 * D + 7200, r = new Int8Array(p);
      this.encodeBuffer = function(a2, b2) {
        1 == c2 && (b2 = a2);
        a2.length > D && (D = a2.length, p = 0 | 1.25 * D + 7200, r = new Int8Array(p));
        a2 = u.lame_encode_buffer(q, a2, b2, a2.length, r, 0, p);
        return new Int8Array(r.subarray(0, a2));
      };
      this.flush = function() {
        var a2 = u.lame_encode_flush(q, r, 0, p);
        return new Int8Array(r.subarray(0, a2));
      };
    };
    lamejs.WavHeader = Fa;
  }
  lamejs();
})();
